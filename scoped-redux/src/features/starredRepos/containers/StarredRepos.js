import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../../../components/List'
import Repo from '../../../components/Repo'
import * as actions from '../actionCreators'
import { selectStarredRepos } from '../selectors'

class StarredReposContainer extends Component {
  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps) {
    this.load(prevProps.login)
  }

  load(prevLogin) {
    const { login, onLoad, status } = this.props

    if (login && login !== prevLogin && status !== 'loading') {
      onLoad({ login })
    }
  }

  render() {
    const {
      login,
      starred,
      onLoadNext,
      nextPageUrl,
      lastPageUrl,
      status,
    } = this.props

    return (
      <List
        renderItem={props => <Repo {...props} key={props.repo.fullName} />}
        items={starred}
        onLoadNext={onLoadNext}
        loadingLabel={`Loading ${login}'s starred...`}
        nextPageUrl={nextPageUrl}
        lastPageUrl={lastPageUrl}
        status={status}
      />
    )
  }
}

export default connect(
  selectStarredRepos,
  {
    onLoad: actions.load,
    onLoadNext: actions.loadNext,
  }
)(StarredReposContainer)
