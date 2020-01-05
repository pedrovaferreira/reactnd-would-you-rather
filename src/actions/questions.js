import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { userAnswerQuestion } from './users'
import { notificationLogin, handleNotification } from './notifications'

export const RECEIVE_QUESTIONS = 'app/receive/questions'
export const ANSWER_QUESTIONS = 'app/answer/questions'
export const LOADING_QUESTIONS = 'app/loading/questions'


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTIONS,
    authedUser, 
    qid, 
    answer
  }
}

export function loadingQuestion(qid, loading) {
  return {
    type: LOADING_QUESTIONS,
    qid, 
    loading
  }
}

export function handleAnswerQuestion(qId, answer){
  return (dispatch, getState) => {
      const { authedUser, users, questions } = getState();
      
      if(authedUser){
          if(users[authedUser].answers[qId] || questions[qId].loading) return;

          dispatch(loadingQuestion(qId, true))

          return saveQuestionAnswer(authedUser, qId, answer)
            .then(_ => {
              dispatch(answerQuestion(authedUser, qId, answer))
              dispatch(userAnswerQuestion(authedUser, qId, answer))
              dispatch(loadingQuestion(qId, false))
            })
      }
      return Promise.resolve()
              .then(_ => dispatch(notificationLogin('You need to be logged in to answer a question!')))
  }
}

export function handleAddQuestion(inputOne, inputTwo){
  return (dispatch, getState) => {
    const { authedUser } = getState();
    
    if(authedUser){
      return saveQuestion(authedUser, inputOne, inputTwo)
              .then(question => dispatch(receiveQuestions({ [question.id]: question })) )
              .then(_ => handleNotification('Question added!', 3000)(dispatch))
    } 
    
    return Promise.resolve()
      .then(_ => dispatch(notificationLogin('You need to be logged in to add a new question!')))
  }
}