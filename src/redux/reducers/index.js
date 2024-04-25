import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { SIGN_OUT } from '../constants/actionTypes';
import login from './loginReducer';

const appReducer = combineReducers({ login });
const rootReducer = (state,action) => {
    if(action.type === SIGN_OUT) {
        state = undefined
        storage.removeItem('persist:root')
        storage.removeItem('token')
    }
    return appReducer(state,action)
}
export default rootReducer;