import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { handleLoginPopup, handleLogout } from '../actions/users'
import { NavLink  } from 'react-router-dom'

class Nav extends Component {

    handleLoginBtn() {
        this.props.dispatch(handleLoginPopup())
    }

    handleLogoutBtn() {
        this.props.dispatch(handleLogout())
    }

    

    render() {
        const { currentUser } = this.props;

        return (
            <div className="nav">
                <NavLink exact activeClassName="active" to="/" className="item">Home</NavLink >
                <NavLink exact activeClassName="active" to="/add" className="item">New Question</NavLink >
                <NavLink exact activeClassName="active" to="/leaderboard" className="item">Leader Board</NavLink >
                {currentUser ?
                    <Fragment>
                        <div className="item user-name">
                            <img
                                src={currentUser.avatarURL}
                                alt={`Avatar of ${currentUser.name}`}
                                className='avatar'
                            />
                            {currentUser.name}
                        </div>
                        <div className="item login" onClick={() => this.handleLogoutBtn()}>Logout</div>
                    </Fragment>
                    :
                    <div className="item login" onClick={() => this.handleLoginBtn()}>Login</div>
                }
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        currentUser: authedUser ? users[authedUser] : null
    }
}

export default connect(mapStateToProps)(Nav)