import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.users.map(user => (
                    <div key={user.id} className={"leader-board"}>
                        <div className='poll-info'>
                            <div className="poll-header">
                                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar' />
                                <div><span className="user-mention">@{user.id}  </span></div>
                            </div>
                        </div>
                        <p> <b>Answered questions:</b> {Object.keys(user.answers).length} </p>
                        <p> <b>Created questions:</b> {user.questions.length} </p>
                        <div className="points">
                            <div className="title">Points</div>
                            <div className="points-box">
                                <div className="points-value">{calcPoints(user)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        )
    }
}

function mapStateToProps({ users }){
    return {
        users: Object.keys(users).map(key => ( users[key]))
                    .sort((a,b) => calcPoints(b) - calcPoints(a))
    }
}

function calcPoints(user){
    return user.questions.length + Object.keys(user.answers).length
}


export default connect(mapStateToProps)(LeaderBoard);