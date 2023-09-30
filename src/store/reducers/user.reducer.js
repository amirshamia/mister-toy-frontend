import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case 'INCREMENT':
            return { ...state, count: state.count + 1 }
        case 'DECREMENT':
            return { ...state, count: state.count - 1 }
        case 'CHANGE_BY':
            return { ...state, count: state.count + action.diff }


        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        default:
            return state;
    }
}