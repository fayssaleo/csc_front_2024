import { SET_LOGIN } from "../constants/actionTypes";

export default function login(state = {}, action) {
    
    if (action.type === SET_LOGIN) {
        return Object.assign({}, state, action.login);
    }
    return state;
}