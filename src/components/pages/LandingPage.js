import React from 'react'
import {connect} from 'react-redux'
import SkillBreakdown from '../breakdown/SkillBreakdown.js'
import SkillExplorer from '../breakdown/SkillExplorer.js'
import DifficultyExplorer from '../breakdown/DifficultyExplorer.js'
import PdfViewer from '../pdf/PdfViewer'

const LandingPage = (props) => {
  // return <SkillExplorer />
  // return <SkillBreakdown />
  // return <DifficultyExplorer />
  return <PdfViewer />
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps    
  }
}

export default connect(mapStateToProps, {})(LandingPage)
