import React, { Component } from 'react';
import Nav from './Nav';
import PollPage from './PollPage';
import Home from './HomePage';
import NewPage from './NewPage';
import LeaderBoard from './LeaderBoard';
import Notification from './Notification';
import LoggedRoute from './LoggedRoute';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import { Route } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    console.log(this.props.notifications)

    if (this.props.loading) return (
      <div className="loading"></div>
    )

 
    return (
      <div className="app">
        <Nav />
        <Route component={Home} path='/' exact />
        <LoggedRoute isAuthenticated={this.props.authedUser}  component={LeaderBoard} path='/leaderboard' exact />
        <LoggedRoute isAuthenticated={this.props.authedUser}  component={NewPage} path='/add' exact />
        <LoggedRoute isAuthenticated={this.props.authedUser}  component={PollPage} path='/questions/:id' exact />
        <Notification />
      </div>
    );
  }
}

function mapStateToProps({ loading, notifications, authedUser }) {
  return {
    loading,
    notifications,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
