/* eslint-disable complexity */
import React, { Fragment } from "react"
import PropTypes from "prop-types"
import DefaultSelect from "part:@sanity/components/selects/default"
import styles from "./styles/SelectLanguage.css"

const LanguagePropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
})
export default class SelectLanguage extends React.Component {
  static propTypes = {
    languages: PropTypes.arrayOf(LanguagePropType),
    selected: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
  }

  handleLangChange = value => {
    this.props.onChange([value.key])
  }

  render() {
    const { languages, selected } = this.props
    const values = languages.map(lang => ({ title: lang.title, key: lang.id }))

    return (
      <Fragment>
        <div className={styles.root}>
          <DefaultSelect
            label="Select language"
            placeholder="Placeholder"
            onChange={this.handleLangChange}
            items={values}
            value={values.find(value => value.key === selected[0])}
          />
        </div>
      </Fragment>
    )
  }
}
