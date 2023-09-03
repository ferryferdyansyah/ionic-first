import { AppState } from "./AppState";

export const AppInitialState: AppState = {
    loading:{
        show: false,
    },
    login:{
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isReCoveredPassword: false,
        isRecoveringPassword: false,
    }
}