import {ILoginStateProps} from "../stateInterfaces";
import {actionTypes} from '../../appStore'
import {Reducer} from "redux";

export const initialLoginState: ILoginStateProps = {
    auth: false,
    btnLoginTxt: "Login",
    loginError: "",
    ageInputFieldState: false,
    inSignUpMode: false,
    isSignOutMode: false
};


const reducer: Reducer<ILoginStateProps> = (state: ILoginStateProps = initialLoginState, action) => {
    if (action.type === actionTypes.SET_AUTH) {
        return setAuth(state, action.authState);
    }
    if (action.type === actionTypes.SET_BTN_LOGIN_TXT) {
        return setBtnLoginTxt(state, action.btnTxt);
    }
    if (action.type === actionTypes.SET_AGE_INPUT_FIELD) {
        return setAgeInputField(state, action.fieldState);
    }
    if (action.type === actionTypes.SET_LOGIN_ERROR) {
        return setLoginError(state, action.errorMessage);
    }
    if (action.type === actionTypes.SET_SIGNUP_MODE) {
        return setSignUpMode(state, action.isSignUp, action.fieldState, action.btnTxt);
    }
    if (action.type === actionTypes.SET_SIGN_OUT_MODE) {
        return setSignOutMode(state, action.isSignOut);
    }
    if (action.type === actionTypes.SET_USER) {
        return setUser(state, action.user);
    }
    return state;
};

function setAuth(state, authState) {
    return {
        ...state,
        auth: authState
    }
}

function setLoginError(state, errorMessage) {
    return {
        ...state,
        loginError: errorMessage
    }
}

function setBtnLoginTxt(state, btnTxt) {
    return {
        ...state,
        btnLoginTxt: btnTxt
    }
}

function setAgeInputField(state, fieldState) {
    return {
        ...state,
        ageInputFieldState: fieldState
    }
}

function setUser(state, fieldState) {
    return {
        ...state,
        ageInputFieldState: fieldState
    }
}

function setSignUpMode(state, isSignUp, fieldState, btnTxt) {
    return {
        ...state,
        inSignUpMode: isSignUp,
        btnLoginTxt: btnTxt,
        ageInputFieldState: fieldState,
        loginError: ""


    }
}

function setSignOutMode(state, isSignOut) {
    return {
        ...state,
        isSignOutMode: isSignOut,

    };
}

export default {reducer};
