import React, { useState } from 'react'
import Pool from './Poll'
import { connect } from 'react-redux'

function HomePage(props) {

    const [ tabOne, setTabOne ] = useState(true);

    const { loading, questionsIdUnanswered, questionsIdAnswered } = props;

    if (loading) return <div></div>

    return (
        <div>
            <div className="questions-filter">

                <div onClick={() => setTabOne(true)} className={ tabOne? "active" : ""}>Unanswered Questions</div>
                <div onClick={() => setTabOne(false)} className={!tabOne ? "active" : ""}>Answered Questions</div>
            </div>
            {
                (tabOne ? questionsIdUnanswered : questionsIdAnswered).map(id => (
                    <Pool isFullContent={false} id={id} key={id} />
                ))
            }
            {
                (tabOne ? questionsIdUnanswered : questionsIdAnswered).length === 0 &&
                <p>No questions for this filter.</p>
            }
        </div>

    )
}


function mapStateToProps({ questions, loading, authedUser, users }) {
    const currentUser = users[authedUser]
    console.log(questions)
    return {
        loading,
        questionsIdUnanswered: Object.keys(questions)
            .filter(id => !currentUser || !currentUser.answers[id])
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        questionsIdAnswered: Object.keys(questions)
            .filter(id => currentUser && currentUser.answers[id])
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(HomePage);