import React, { Component } from 'react'
import { connect } from 'react-redux'
import { notificationLogin } from '../actions/notifications'
import { handleLogin } from '../actions/users'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        redirectToHome: false
    }
    handleCloseBtn() {
        this.props.dispatch(notificationLogin(undefined))
    }

    handleUserChange(e) {
        this.setState({ redirectToHome: true })
        this.props.dispatch(handleLogin(e.target.value))

    }

    render() {

        if (this.state.redirectToHome)
            return <Redirect to="/" />

        return (
            <div className="login-box">
                <div className="login-header">
                    Login
                    {!this.props.isPage &&
                        <div onClick={() => this.handleCloseBtn()} className="close">x</div>
                    }
                </div>
                
                {!this.props.isPage ?
                    <div className="error-message">{this.props.message}</div> :
                    <div className="error-message">You need to be logged to access this page.</div> 
                }
                <div className="select-user">Select user:</div>
                <select value="" onChange={(e) => this.handleUserChange(e)}>
                    <option disabled value="">Select a user:</option>
                    {this.props.users.map(user => (
                        <option key={user.id} value={user.id} >{user.name}</option>
                    ))}
                </select>
            </div>
        )
    }
}

function mapStateToProps({ users, notifications }) {
    return {
        users: Object.keys(users)
            .map(key => ({ id: key, name: users[key].name })),
        message: notifications.login
    }
}

export default connect(mapStateToProps)(Login)