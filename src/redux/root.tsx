import { createStore } from 'redux'


export interface authState {
    user: boolean;
    admin: boolean;
}

export enum ActionType {
    USERLOGIN = "USERLOGIN",
    ADMINLOGIN = "ADMINLOGIN",
    LOGOUT = "LOGOUT",
}

export interface UserAction {
    type: ActionType.USERLOGIN;
}

export interface AdminAction {
    type: ActionType.ADMINLOGIN;
}

export interface LogoutAction {
    type: ActionType.LOGOUT;
}

export type Action = UserAction | AdminAction | LogoutAction;

// Define your reducer
export const initialState: authState = {
    user: false,
    admin: false
};

export function authReducer(state: authState = initialState, action: Action): authState {
    switch (action.type) {
        case ActionType.USERLOGIN:
            return { ...state, user: state.user = true };
        case ActionType.ADMINLOGIN:
            return { ...state, admin: state.admin = true };
        case ActionType.LOGOUT:
            console.log('hello')
            return { ...state, user: state.user = false, admin: state.admin = false};
        default:
            return state;
    }
}

// Create Redux store
export const store = createStore(authReducer);