import React      from 'react'
import PropTypes  from 'prop-types'
import classnames from 'classnames'
import { pref }   from '~/components/util/component-utils'
import Tooltip    from '~/vendor/tooltip.min'

import './hovercard.scss'

const componentName = pref('hovercard')

class Hovercard extends React.Component {
  constructor(...args) {
    super(...args)

    this.tooltip = new Tooltip('', {...this.props.options, place: this.props.place})

    if (!this.props.hovercardContent)
      window.console.warn('Component has not provided props.hovercardContent')
  }

  classes() {
    return classnames(`${componentName}__wrapper`, this.props.className)
  }

  componentDidMount() {
    this.tooltip.attach(this.hovercardWrapper).content(this.hovercardContent)

    if (this.props.show) {
      this.tooltip.show()
    }
  }

  componentDidUpdate() {
    this.tooltip.content(this.hovercardContent).updateSize()
  }

  componentWillUnmount() {
    this.tooltip.detach()
    this.tooltip = null
  }

  render() {
    let { hovercardContent, className } = this.props

    return (
      <span
        ref={r => this.hovercardWrapper = r }
        className={this.classes()}
        onMouseEnter={() => this.tooltip.show()}
        onMouseLeave={() => this.tooltip.hide()}
      >
        {this.props.children}

        <div
          className={`${componentName}__content-ref`}
          ref={r => this.hovercardContent = r }
        >
          <span className={classnames(`${componentName}__content`, className)}>
            {hovercardContent}
          </span>
        </div>

      </span>
    )
  }
}

// https://facebook.github.io/react/docs/reusable-components.html
Hovercard.propTypes = {
  hovercardContent: PropTypes.any.isRequired,
  className: PropTypes.string,
  place: PropTypes.string,
  options: PropTypes.object, //https://github.com/darsain/tooltip/wiki/Tooltip
  show: PropTypes.bool, // if true, will show the hovercard by default
  children: PropTypes.node
}
Hovercard.defaultProps = {
  hovercardContent: null,
  className: '',
  place: 'bottom',
  options: { auto: true, effectClass: 'fade', typeClass: pref('tooltip') }
}

export default Hovercard
