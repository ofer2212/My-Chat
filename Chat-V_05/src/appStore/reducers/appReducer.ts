import {IAppStateProps} from "../stateInterfaces";
import {Reducer} from "redux";
import {actionTypes} from '../../appStore'
import {IUser} from "../../../server/";

export const initialAppState: IAppStateProps = {
    user: { type:"user", name: "", _id: "", age: "", gender: "",online:false,password:""},
    error: ""
};


const reducer: Reducer<IAppStateProps> = (state: IAppStateProps = initialAppState, action) => {
    if (action.type === actionTypes.SET_USER) {
        return setUser(state, action.user);
    }

    if (action.type === actionTypes.SET_ERROR_MESSAGE) {
        return setError(state, action.errMsg);
    }
    return state;
};


function setError(state, errorMessage) {
    return {
        ...state,
        error: errorMessage
    }
}

function setUser(state: IAppStateProps, currentUser: IUser) {
    return {
        ...state,
        user: {
            ...state.user,
            name: currentUser.name,
            age: currentUser.age,
            _id: currentUser._id,
            gender: currentUser.gender,
            online: currentUser.online
        }
    }
}


export default {reducer};
