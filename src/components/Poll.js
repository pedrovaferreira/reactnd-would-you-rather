import React, { Component, Fragment } from 'react'
import { formatDate } from '../utils/helpers'
import Statistics from './Statistics'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class Poll extends Component {

    state = {
        redirectToDetails: false
    }

    handleAnswer(answer) {
        const { id } = this.props;

        this.props.dispatch(handleAnswerQuestion(id, answer))
    }

    handleBoxClick(){
        console.log("A", this.props.isFullContent)
        if(!this.props.isFullContent)
            this.setState({ redirectToDetails : true })
    }

    renderFeedContent() {
        return (<div><b className="question">Would you rather:</b> {this.props.question.optionOne.text} <div className="or"> or</div> ...</div>)
    }

    renderFullContent() {

        const { currentUser, id, question } = this.props;
        let answers = undefined;
        if (currentUser) {
            answers = currentUser.answers[id]
        }

        const optionClass = (option) => {
            if (!answers) return "option";
            if (answers === option) return "option active";
            return "option disactive";
        }

        return (
            <Fragment>
                <h3>Would you rather</h3>
                <div className="options">
                    <div className={optionClass("optionOne")} onClick={() => this.handleAnswer("optionOne")}>
                        <span>{this.props.question.optionOne.text}</span>
                    </div>
                    <div className="or">or</div>
                    <div className={optionClass("optionTwo")} onClick={() => this.handleAnswer("optionTwo")}>
                        <span>{this.props.question.optionTwo.text}a</span>
                    </div>
                </div>
                {answers &&
                    <Statistics values={[question.optionOne.votes.length, question.optionTwo.votes.length]} />
                }
            </Fragment>
        )
    }

    render() {


        const { user, question, isFullContent } = this.props;
        const { id, avatarURL, name } = user;
        const { timestamp, loading } = question;

        if(this.state.redirectToDetails)
            return <Redirect to={`/questions/${question.id}`} />
            
        return (
            <div className={"poll " + (!isFullContent ? 'with-hover' : '') + (loading ? ' loading' : '')}
                onClick={() => this.handleBoxClick()}>
                <div className='poll-info'>
                    <div className="poll-header">
                        <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar' />
                        <div><span className="user-mention">@{id}</span></div>
                        <div className="time">{formatDate(timestamp)}</div>
                    </div>
                    {isFullContent ? this.renderFullContent() : this.renderFeedContent()}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
    return {
        question: questions[id],
        user: users[questions[id].author],
        currentUser: authedUser ? users[authedUser] : null
    }
}

export default connect(mapStateToProps)(Poll)