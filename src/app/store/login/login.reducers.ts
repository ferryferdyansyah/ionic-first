import { Action, createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.action";
import { LoginState } from "./LoginState";

const initialState: LoginState = AppInitialState.login

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
        error: null,
        isReCoveredPassword: false,
        isRecoveringPassword: true
    };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
        error: null,
        isReCoveredPassword: true,
        isRecoveringPassword: false};
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
        error: action.error,
        isReCoveredPassword: false,
        isRecoveringPassword: false};
    }),
    on(login, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        }
    }),
    on(loginSuccess, currentState => {
        return {
            ...currentState,
            isLoggedIn: true,
            isLoggingIn: false
        }
    }),
    on(loginFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        }
    })

    )
export function loginReducer(state: LoginState, action: Action){
    return reducer(state, action)
}