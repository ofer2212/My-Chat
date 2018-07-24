import * as actionTypes from "./actionTypes";


export function setUserLine(line: string): any {
    return {
        type: actionTypes.SET_USER_DETAILS_LINE,
        userLine: line
    }
}

export function setChatWithLine(withName: string): any {
    return {
        type: actionTypes.SET_CHATWITH_LINE,
        chatWith: withName
    }
}

export function setPublicGroupMode(isPublicState: boolean): any {
    return {
        type: actionTypes.SET_PUBLIC_GROUP_MODE,
        isNewPublic: isPublicState
    }
}

export function setShowLendingModal(showModal: boolean): any {
    return dispatch => {

        dispatch({type: actionTypes.SET_SHOW_LENDING_MODAL, showState: showModal});

    };
}

