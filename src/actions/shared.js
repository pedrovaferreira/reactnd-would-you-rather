import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { receiveAuthedUser } from './authedUser';
import { updateLoading } from './loading';

export function handleInitialData(){
    return (dispatch) => {
        dispatch(updateLoading(true))
        return getInitialData()
            .then(({users, questions}) => {
                const currentUser = localStorage.getItem("currentUser");
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                dispatch(receiveAuthedUser(currentUser !== "undefined"  ? currentUser : null))
                dispatch(updateLoading(false))
            })
    }
}
