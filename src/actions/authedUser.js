export const RECEIVE_AUTHED_USER = 'app/receive/authed_user'

export function receiveAuthedUser(user) {
  return {
    type: RECEIVE_AUTHED_USER,
    user,
  }
}
