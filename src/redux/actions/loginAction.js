import {SET_LOGIN, SIGN_OUT} from '../constants/actionTypes'

export function setLogin(login = {}) {
    return {
        type: SET_LOGIN,
        login
    };
}
export function signOut(login= {}) {
    return {
        type: SIGN_OUT,
        login
    };
}