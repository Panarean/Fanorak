
import { createStore } from 'redux';
const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';

const updateLoginStatus = (isLoggedIn) => ({
    type: UPDATE_LOGIN_STATUS,
    payload: isLoggedIn,
  });

const initialState = {
    isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOGIN_STATUS:
        return {
            ...state,
            isLoggedIn: action.payload,

        };
        default:
        return state;
    }
};

const store = createStore(loginReducer);

export default store;