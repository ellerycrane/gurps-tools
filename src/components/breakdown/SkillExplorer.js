import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import SkillProbabilities from '~/constants/probabilities'
import QuickContestProbs from '~/constants/quickContestProbabilities'
import LevelDescriptions from '~/constants/levelDescriptions'

import min from 'lodash/min'
import max from 'lodash/max'
import groupBy from 'lodash/groupBy'
import cloneDeep from 'lodash/cloneDeep'
import isInteger from 'lodash/isInteger'

import './skill-explorer.scss'


const
  extractLevels = (descriptions) => Object.keys(descriptions).map((key) => {
    return parseInt(key)
  }),
  createLevelDescriptions = (raw) => {
    const result = cloneDeep(raw)

    Object.keys(result).forEach((key) => {
      result[key].level = parseInt(key)
    })

    return result
  },
  skillGroupInfo = cloneDeep(LevelDescriptions.skillGroups),
  skillLevelDescriptions = createLevelDescriptions(LevelDescriptions.skills),
  skillLevels = extractLevels(skillLevelDescriptions).sort((a, b) => a - b),
  skillInfoByGroup = groupBy(skillLevelDescriptions, 'group'),
  skillGroupList = Object.entries(skillInfoByGroup).map((entry) => {
    return {group: entry[0], info: skillGroupInfo[entry[0]], levels: entry[1], minLevel: min(entry[1].map(row => row.level))}
  }).sort((a, b) => a.minLevel - b.minLevel),
  minSkillLevel = min(skillLevels),
  maxSkillLevel = max(skillLevels),

  formatSkillLevel = (level) => {
    if (level === minSkillLevel) {
      return `${level} or less`
    }
    if (level === maxSkillLevel) {
      return `${level} or more`
    }
    return level.toString()
  },
  formatSkillRange = (level) => {
    if (level === minSkillLevel || level === maxSkillLevel) {
      return formatSkillLevel(level)
    }

    const
      nextLevel = skillLevels[skillLevels.indexOf(level) + 1],
      endOfRange = nextLevel - 1

    return `${level}-${endOfRange}`
  },

  getSkillLevelInfo = (lvl) => {
    const
      level = isInteger(parseInt(lvl)) ? parseInt(lvl) : 10 // just treat invalid skill levels as 10; more complex error handling is unnecessary

    let
      skillLevelInfoKey = null

    if(level <= minSkillLevel){
      skillLevelInfoKey = minSkillLevel
    } else if (level >= maxSkillLevel){
      skillLevelInfoKey = maxSkillLevel
    } else {
      skillLevelInfoKey = skillLevels.find((levelKey, i)=>(level < skillLevels[i+1] && level >= levelKey))
    }
    return skillLevelDescriptions[skillLevelInfoKey.toString()]
  },
  SkillLevelDetails = ({skillLevelInfo}) => {
    const
      {label, description, addendum} = skillLevelInfo,
      addendumItem = addendum ? <span className='level-addendum'>({addendum})</span> : null

    return (
      <div className="level-details">
        <span className="level-title">
          <span className="level-label">{label}</span>{addendumItem}.
        </span> <span className="level-description">{description} </span>
      </div>
    )
  },
  SkillLevelList = ({levels}) => {
    const
      levelItems = levels.map((info) => {
        const
          {level} = info

        return (
          <li className="skill-level-item" key={level}>
            <div className="level-range">{formatSkillRange(level)}:</div>
            <SkillLevelDetails skillLevelInfo={info}/>
          </li>
        )
      })

    return (
      <ul className="skill-level-list">
        {levelItems}
      </ul>
    )
  },

  SkillGroupInfo = ({group, children}) => {
    const
      groupInfo = skillGroupInfo[group]

    return (
      <div className="skill-group-info">
        <h2 className="group-label">{groupInfo.label}</h2>
        <div className="group-details">
          <p className="group-description">{groupInfo.description}</p>{children}
        </div>
      </div>
    )
  },
  SkillGroupList = (props) => {
    const
      groupItems = skillGroupList.map((g) => {
        const {group, levels} = g

        return (
          <li key={group} className="group">
            <SkillGroupInfo group={group}> <SkillLevelList levels={levels}/> </SkillGroupInfo>
          </li>
        )
      })

    return <ul className="skill-group">
      {groupItems}
    </ul>

  },
  SkillExplorer = (props) => {
    const
      {
        someProp,
      } = props

    return (
      <div className="skill-group-breakdown">
        <SkillGroupList/>
      </div>
    )
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


export {
  SkillExplorer,
  SkillLevelList,
  SkillGroupInfo,
  SkillLevelDetails,
  getSkillLevelInfo,
  skillGroupList
}

export default connect(mapStateToProps, {})(SkillExplorer)
