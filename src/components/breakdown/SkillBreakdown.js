import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import QuickContestProbs from '~/constants/quickContestProbabilities'



import './skill-breakdown.scss'

const
  QuickContestSuccessTable = (props) => {

    let
      rows = [],
      headerCells = [<th key={'blank'}/>].concat(Object.keys(QuickContestProbs).map((lvl)=><th key={`col-header-${lvl}`}>{lvl}</th>))

    Object.keys(QuickContestProbs).forEach((skillLevel)=>{
      let
        probs = QuickContestProbs[skillLevel],
        cells = [<th key={`row-header-${skillLevel}`}>{skillLevel}</th>]

      Object.keys(probs).forEach((opposedSkillLevel)=>{
        let
          v = probs[opposedSkillLevel],
          prob = parseFloat(v.probabilityOfSuccess),
          // prob = parseFloat(v.probabilityOfTie),
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



        cells.push(
          <td className={classnames('success-chance', className)} key={`${skillLevel}-${opposedSkillLevel}`}>{prob < 1 || prob > 99 ? prob.toFixed(2) : prob.toFixed(1)}%</td>
        )

        //probabilityOfTie

        // {
        //   "skillLevel": 3,
        //   "opposedSkillLevel": 24,
        //   "probabilityOfSuccess": "0.03",
        //   "probabilityOfTie": "0.00"
        // }

      })
      rows.push(<tr>{cells}</tr>)
    })

    return (
      <table className='probability-table'>
        <thead>
          <tr>{headerCells}</tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  },
  SkillBreakdown = (props) => {
    const
      {
        energyRemaining,
        totalEnergy,
        drawPileCount,
        discardPileCount
      } = props

    return (
      <div className="skill-breakdown">
        <QuickContestSuccessTable/>
      </div>
    )
  }


const fakeProps = {
  energyRemaining: 3,
  totalEnergy: 3,
  drawPileCount: 6,
  discardPileCount: 7
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    ...fakeProps
  }
}

export default connect(mapStateToProps, {})(SkillBreakdown)
