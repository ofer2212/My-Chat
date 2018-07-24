import {IDisplayStateProps} from "../stateInterfaces";
import {Reducer} from "redux";
import {actionTypes} from '../../appStore'

export const initialDisplayState: IDisplayStateProps = {
    userDetailsLine: "Disconnected",
    chatWithLine: "",
    newPublicGroupMode:false,
    showLendingModal:false
};

const reducer: Reducer<IDisplayStateProps> = (state: IDisplayStateProps = initialDisplayState, action) => {
    if (action.type === actionTypes.SET_USER_DETAILS_LINE) {
        return setUserLine(state, action.userLine);
    }
    if (action.type === actionTypes.SET_CHATWITH_LINE) {
        return setChatWithLine(state, action.chatWith);
    }
    if (action.type === actionTypes.SET_PUBLIC_GROUP_MODE) {
        return setPublicGroupMode(state, action.isNewPublic);
    }
    if (action.type === actionTypes.SET_SHOW_LENDING_MODAL) {
        return setLendingModal(state, action.showState)
    }
    return state;
};

function setLendingModal(state, showState) {
    return {
        ...state,
        showLendingModal: showState
    }
}

function setUserLine(state, userLine) {
    return {
        ...state,
        userDetailsLine: userLine
    }
}

function setChatWithLine(state, chatWith) {
    return {
        ...state,
        chatWithLine: chatWith
    }
}

function setPublicGroupMode(state, isNewPublic) {
    return {
        ...state,
        newPublicGroupMode: isNewPublic
    }
}
export default {reducer};
