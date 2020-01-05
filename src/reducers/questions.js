import { RECEIVE_QUESTIONS, ANSWER_QUESTIONS, LOADING_QUESTIONS } from '../actions/questions'

export default function questions(state = {}, action){
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions 
            };
        case LOADING_QUESTIONS:
            return {
                ...state,
                [action.qid]:  Object.assign({}, state[action.qid], { loading: action.loading }) 
            };
        case ANSWER_QUESTIONS:
            return {
                ...state,
                [action.qid]: {
                  ...state[action.qid],
                  [action.answer]: {
                    ...state[action.qid][action.answer],
                    votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                  }
                }
              }
        default:
            return state;
    }
}