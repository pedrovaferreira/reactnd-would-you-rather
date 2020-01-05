import users from './users'
import questions from './questions'
import authedUser from './authedUser'
import loading from './loading'
import notifications from './notifications'
import { combineReducers } from 'redux'

export default combineReducers({
    users,
    questions, 
    authedUser,
    loading,
    notifications
})