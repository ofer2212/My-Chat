import {Api} from "../../serverApi/serverApi";
import * as actionTypes from "./actionTypes";
import {IMessage} from "../../../server/";
import {isMessage} from "../../helpers";
import {actions} from "../index";
import {store} from "../../index";
import {IClientData, IGroup, IUser} from "../../../server/sharedInterfaces";


export function loadMessages(withId: string) {
    return dispatch => {
        try {
            //    console.log("in loadMessages - ","from -"+ fromId,"with - "+withId);
            // dispatch(actions.setShowLendingModal(true))
            let messages = [];
            const storeData = store.getState();
            const tempData: IClientData = storeData.tree.tempData;
            if (storeData.tree.selectedEntity.type==='user') {
                tempData.user[0].messages.forEach((message: IMessage) => {
                    if (message.toUser === withId || message.toGroup === withId || message.from === withId) {

                        messages.push(message)
                    }
                });
            }
            else if (storeData.tree.selectedEntity.type==='group') {
                tempData.groups[0].messages.forEach((message: IMessage) => {
                    if (message.toGroup === withId || message.from === withId) {

                        messages.push(message)
                    }
                });
            }
            //    console.log("the messages - ",messages);


            // if (isMessage(messages[0])) {
            dispatch(getMessages(messages));
            dispatch({type: actionTypes.SET_SHOW_MESSAGE, showMessageState: true});
            // }
            // else {
            //     throw new Error(messages)
            // }
        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
            console.log(e)
        }

    };
}

export function sendMessage(fromUid: string, toUid: string, msgContent: string): any {
    return async dispatch => {
        try {
            const generatedMessage = await Api.put(`/message/send`, {
                fromId: fromUid,
                toId: toUid,
                content: msgContent
            });
            console.log(generatedMessage);
            dispatch(setNewMessage(generatedMessage));
            dispatch({type: actionTypes.SET_MESSAGE_SENT_FLAG, messageSentFlag: true})
        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
        }

    };
}

export function setAddGroupModal(showModal: boolean): any {
    return dispatch => {
        dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: ""});
        dispatch({type: actionTypes.SHOW_ADD_GROUP_MODAL, modalState: showModal});


    };
}

export function setDeleteGroupModal(showModal: boolean): any {
    return dispatch => {
        dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: ""});
        dispatch({type: actionTypes.SHOW_DELETE_GROUP_MODAL, modalState: showModal});


    };
}


function getMessages(newMessages: IMessage[]) {
    return {
        type: actionTypes.LOAD_MESSAGES,
        messages: newMessages
    }
}

function setNewMessage(newMsg: IMessage[]) {
    return {
        type: actionTypes.SEND_MESSAGE,
        newMessage: newMsg
    }
}


