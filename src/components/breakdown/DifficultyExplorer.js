import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import SkillProbabilities from '~/constants/probabilities'
import QuickContestProbs from '~/constants/quickContestProbabilities'
import LevelDescriptions from '~/constants/levelDescriptions'

import {getSkillLevelInfo, skillGroupList, SkillGroupInfo, SkillLevelDetails} from './SkillExplorer'

import min from 'lodash/min'
import max from 'lodash/max'
import groupBy from 'lodash/groupBy'
import cloneDeep from 'lodash/cloneDeep'
import range from 'lodash/range'
import clamp from 'lodash/clamp'
import fromPairs from 'lodash/fromPairs'


import './difficulty-explorer.scss'
import probabilities from "../../constants/probabilities"

class SkillLevelSelect extends React.Component {
  constructor(props) {
    super(props)
    this.handleSkillLevelInputChange = this.handleSkillLevelInputChange.bind(this)
  }

  handleSkillLevelInputChange(e) {
    this.props.onSkillLevelChange(e.target.value)
  }

  render() {

    const
      levels = range(3, 28),
      groupOptions = fromPairs(Object.keys(LevelDescriptions.skillGroups).map((k) => [k, []])),
      options = levels.map((lvl) => {
        const
          info = getSkillLevelInfo(lvl),
          option = (<option key={lvl} value={lvl}>{lvl} - {info.label}</option>)

        groupOptions[info.group].push(option)

        return option
      }),
      optGroups = skillGroupList.map((groupInfo) => {
        return (
          <optgroup key={groupInfo.group} label={groupInfo.info.label}>
            {groupOptions[groupInfo.group]}
          </optgroup>
        )
      })

    return (

      <select value={this.props.value} onChange={this.handleSkillLevelInputChange}>
        {optGroups}
      </select>

    )
  }
}

const ProbabilityCell = ({probability}) => {
  let
    prob = parseFloat(probability),
    className = 'even'

  if (prob <= 3) {
    className = 'impossible'
  } else if (prob <= 5) {
    className = 'dangerous'
  } else if (prob <= 10) {
    className = 'very-hard'
  } else if (prob <= 20) {
    className = 'hard'
  } else if (prob <= 30) {
    className = 'very-unfavorable'
  } else if (prob <= 40) {
    className = 'unfavorable'
  } else if (prob <= 60) {
    className = 'even'
  } else if (prob <= 65) {
    className = 'good'
  } else if (prob <= 75) {
    className = 'great'
  } else if (prob <= 85) {
    className = 'outstanding'
  } else if (prob <= 95) {
    className = 'amazing'
  } else if (prob <= 98) {
    className = 'stupendous'
  } else {
    className = 'guaranteed'
  }

  return (
    <td
      className={classnames('success-chance', className)}>{prob < 1 || prob > 99 ? prob.toFixed(1) : prob.toFixed(1)}%</td>
  )
}

const ProbabilitiesAndModifiers = ({skillLevel, modifier, nextModifier}) => {
  let
    modValue = parseInt(modifier),
    nextMod = nextModifier ? parseInt(nextModifier) : modValue - 1,
    rows = []

  while (modValue > nextMod) {
    let
      effectiveSkillLevel = clamp(parseInt(skillLevel) + modValue, 3, 18),
      probability = probabilities[effectiveSkillLevel.toString()].probabilityOfSuccess

    rows.push(
      <tr key={modValue.toString()}>
        <ProbabilityCell probability={probability}/>
        <td className="modifier">{modValue > 0 ? '+' : ''}{modValue}</td>
      </tr>
    )
    modValue--
  }

  return (

      <table className="prob-mult-table">
        <tbody>
        {rows}
        </tbody>
      </table>

  )
}

const DifficultyBreakdown = (props) => {

  const
    {skillLevel} = props,
    difficulties = LevelDescriptions.taskDifficulty,
    sortedModifiers = Object.keys(difficulties).sort((a, b) => parseInt(b) - parseInt(a)),
    items = sortedModifiers.map((modifier, idx) => {
      const
        info = difficulties[modifier],
        nextModifier = sortedModifiers[idx + 1],
        modValue = parseInt(modifier),
        effectiveSkillLevel = clamp(parseInt(skillLevel) + modValue, 3, 18),
        probability = probabilities[effectiveSkillLevel.toString()].probabilityOfSuccess

      return (
        <tr key={modifier} className="difficulty-row">
          <td className="prob-mult-column difficulty-cell">
            <ProbabilitiesAndModifiers skillLevel={skillLevel} modifier={modifier} nextModifier={nextModifier}/>
          </td>
          <td className="label difficulty-cell">{info.label}</td>
          <td className="description difficulty-cell">{info.description} <span className="example">Example: {info.example}</span></td>
        </tr>
      )
    })


  return (
    <div className="difficulty-breakdown">
      <table>
        {/*<thead></thead>*/}
        <tbody>
        {items}
        </tbody>
      </table>
    </div>
  )
}

class DifficultyExplorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectedSkillLevel: 10}
    this.onSkillLevelChange = this.onSkillLevelChange.bind(this)
  }

  onSkillLevelChange(value) {
    this.setState({selectedSkillLevel: value})
  }

  componentDidMount() {
  }

  render() {

    let
      skillLevel = this.state.selectedSkillLevel,
      skillInfo = getSkillLevelInfo(skillLevel)

    return (
      <div className="difficulty-explorer">
        <SkillLevelSelect value={skillLevel} onSkillLevelChange={this.onSkillLevelChange}/>
        <div className="level-overview">
          <h1 className="selected-level">{skillLevel}</h1>
          <SkillLevelDetails skillLevelInfo={skillInfo}/> <SkillGroupInfo group={skillInfo.group}/>
        </div>
        <DifficultyBreakdown skillLevel={skillLevel}/>
      </div>
    )
  }
}

const fakeProps = {
  someProp: 3
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...fakeProps
  }
}

export default connect(mapStateToProps, {})(DifficultyExplorer)
