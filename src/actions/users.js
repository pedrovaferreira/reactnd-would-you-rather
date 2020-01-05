import { receiveAuthedUser } from './authedUser';
import { notificationLogin, handleNotification } from './notifications'
export const RECEIVE_USERS = 'app/receive/users'
export const ANSWER_QUESTIONS_USER = 'app/user/answer_questions'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function userAnswerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTIONS_USER,
    authedUser, 
    qid, 
    answer
  }
}

export function handleLogin(userid) {
  return (dispatch, getState) => {
    const { users } = getState();
    localStorage.setItem("currentUser", userid);
    dispatch(receiveAuthedUser(userid))
    dispatch(notificationLogin(undefined))
    return handleNotification(`Welcome, ${users[userid].name}!`, 3000)(dispatch);
  }
  
}

export function handleLoginPopup(){
  return notificationLogin(true);
}

export function handleLogout(){
  return (dispatch) => {
      localStorage.removeItem("currentUser")
      dispatch(receiveAuthedUser(null))
  }
}