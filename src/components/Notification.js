import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login';

class Notification extends Component {

    render() {
        const { notifications } = this.props;

        if (!notifications) return null;

        if (notifications.login)
            return (
                <div className="overlay">
                    <Login />
                </div>
            )
        
        if(notifications.notification && notifications.notification.message)
            return (
                <div className="notification">
                    {notifications.notification.message}
                </div>
        )

        return null;
    }
}

function mapStateToProps({ notifications }) {
    return {
        notifications
    }
}

export default connect(mapStateToProps)(Notification);