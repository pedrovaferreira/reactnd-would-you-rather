export const NOTIFICATIONS_LOGIN = 'app/notifications/login'
export const NOTIFICATIONS_ALERT = 'app/notifications/alert'

export function notificationLogin(value){
    return {
        type: NOTIFICATIONS_LOGIN,
        login: value
    }
}

export function notificationAlert(notification){
    return {
        type: NOTIFICATIONS_ALERT,
        notification
    }
}

function notificationAlertClear(){
    return {
        type: NOTIFICATIONS_ALERT,
        notification : {}
    }
}


export function handleNotification(message, time){
    return (dispatch) => {
        dispatch(notificationAlert({message, time}))
        return new Promise(resolve => setTimeout(() => resolve(dispatch(notificationAlertClear())), time) )
    }
}