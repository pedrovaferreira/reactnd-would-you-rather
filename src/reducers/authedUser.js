import { RECEIVE_AUTHED_USER } from '../actions/authedUser';

export default function authedUser(state = null, action){
    switch (action.type) {
        case RECEIVE_AUTHED_USER:
            return action.user;
        default:
            return state;
    }
}