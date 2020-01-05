import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import {  Redirect } from 'react-router-dom'
class NewPoll extends Component{

    state = {
        inputOne: '',
        inputTwo: '',
        redirectToHome: false
    }

    handleSubmit(){
        const { inputOne, inputTwo } = this.state;
        this.props.dispatch(handleAddQuestion(inputOne, inputTwo))
        this.setState({redirectToHome: true})
    }

    render(){

        if(this.state.redirectToHome) 
            return <Redirect to="/" />
        const { inputOne, inputTwo } = this.state;
        const enable = inputOne.length >= 3 && inputTwo.length >= 3;
        return (
            <div className="new-poll">
                <h5>Would you rather ...</h5>
                <input placeholder="one thing..." value={inputOne} onChange={(e) => this.setState({ inputOne : e.target.value })} />
                <div className="or">or</div>
                <input placeholder="another thing..." value={inputTwo} onChange={(e) => this.setState({ inputTwo : e.target.value })} />
                <button disabled={!enable} onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        )
    }
}

export default connect()(NewPoll)