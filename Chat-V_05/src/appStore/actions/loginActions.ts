import {Api} from "../../serverApi/serverApi";
import {IUserAuth} from "../../../server/";
import * as actionTypes from "./actionTypes";
import {isClientUser} from "../../helpers";
import {actions} from '../../appStore'

export function validateUser(userAuth: IUserAuth): any {
    return async dispatch => {
        try {
            if (userAuth.password === "" || userAuth.name === "") {
                dispatch(setLoginError("Fill missing field"))
            }
            else {
                const auth = await Api.post("/validate", {password: userAuth.password, name: userAuth.name});
                if (auth._id) {
                    dispatch(setAuth(true));
                    dispatch({type: actionTypes.SET_USER_DETAILS_LINE, userLine: `${auth.name} ,Connected`});
                    dispatch({type: actionTypes.SET_USER, user:auth});
                    dispatch(actions.loadTree(auth._id));

                }
                else {
                    dispatch(setLoginError(auth))
                }
            }
        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: e.message});
        }

    };
}


// router.put('/newuser',  express.json(), UserController.newUser);
// // body => {"name":"name","password":"password","age":age }


export function signUp(newUsername: string, newPassword: string, newAge: number ,newGender:string): any {
    return async dispatch => {
        try {
            if (newUsername === "" || newPassword === "" || !newAge) {
                dispatch(setLoginError("Fill missing field"))
            }
            else {
                const result = await Api.put("/user/newuser", {name: newUsername, password: newPassword, age: newAge , gender:newGender});
                if (result === "user created") {

                    dispatch(setLoginProcess());
                    dispatch(setLoginError("user created, please login"));
                }
                else {
                }
                dispatch(setLoginError(result));

            }
        }
        catch (e) {
            dispatch(setLoginError(e.message));
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: e.message});
        }

    };
}


export function signOut(userId: string): any {
    return async dispatch => {
        try {
            console.log(userId);
            if (userId === "") {
                dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: "id is empty"});
            }
            else {
                await Api.delete(`/user/${userId}`);
                dispatch(logOut())
            }
        }
        catch (e) {

            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: e.message});
        }

    };
}

export function logOut(): any {
    return dispatch => {

        dispatch({type: actionTypes.SET_USER_DETAILS_LINE, userLine: `Disconnected`});
        dispatch({type: actionTypes.SET_SIGNUP_MODE, isSignUp: false, btnTxt: "Log In", fieldState: false});
        dispatch(setAuth(false));
        dispatch(actions.removeTree(true));
        dispatch({type: actionTypes.SET_UPDATE_TREE, updateState: false});


    };
}

export function setSignUpProcess(): any {
    return dispatch => {

        dispatch({type: actionTypes.SET_SIGNUP_MODE, isSignUp: true, btnTxt: "Cancel", fieldState: true});

    };
}

export function setSignOutMode(ON: Boolean): any {
    return dispatch => {

        dispatch({type: actionTypes.SET_SIGN_OUT_MODE, isSignOut: ON});

    };
}

export function setLoginProcess(): any {
    return dispatch => {

        dispatch({type: actionTypes.SET_SIGNUP_MODE, isSignUp: false, btnTxt: "Log In", fieldState: false});

    };
}


export function setLoginError(errMsg: string) {
    return {
        type: actionTypes.SET_LOGIN_ERROR,
        errorMessage: errMsg
    }
}


function setAuth(auth: boolean) {
    return {
        type: actionTypes.SET_AUTH,
        authState: auth
    }
}

