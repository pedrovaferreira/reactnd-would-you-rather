import { NOTIFICATIONS_LOGIN, NOTIFICATIONS_ALERT } from '../actions/notifications'

export default function notifications(state = {}, action){
    
    switch (action.type) {
        case NOTIFICATIONS_ALERT:
        case NOTIFICATIONS_LOGIN:
            return {
                ...state,
                ...action
            }
        default:
            return state;
    }
}