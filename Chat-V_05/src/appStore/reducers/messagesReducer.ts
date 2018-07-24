import {actionTypes} from '../../appStore'
import {Reducer} from "redux";
import {IMessagesStateProps} from "../stateInterfaces";

export const initialMessagesState: IMessagesStateProps = {
    messages: [],
    messageSentFlag: false,
    showMessages: false,
    showAddGroupModal: false,
    showDeleteGroupModal: false
};

const reducer: Reducer<IMessagesStateProps> = (state: IMessagesStateProps = initialMessagesState, action) => {
    if (action.type === actionTypes.SEND_MESSAGE) {
        return sendMessage(state, action.newMessage);
    }
    if (action.type === actionTypes.LOAD_MESSAGES) {
        return loadMessages(state, action.messages);
    }
    if (action.type === actionTypes.SET_MESSAGE_SENT_FLAG) {
        return setMessageSentFlag(state, action.isMessageSent);
    }
    if (action.type === actionTypes.SET_SHOW_MESSAGE) {
        return setShowMessages(state, action.showMessageState);
    }
    if (action.type === actionTypes.SHOW_ADD_GROUP_MODAL) {
        return setAddGroupModalState(state, action.modalState);
    }
    if (action.type === actionTypes.SHOW_DELETE_GROUP_MODAL) {
        return setDeleteGroupModalState(state, action.modalState);
    }
    return state;
};

function setDeleteGroupModalState(state, modalState) {
    return {
        ...state,
        showDeleteGroupModal: modalState
    }
}

function setAddGroupModalState(state, modalState) {
    return {
        ...state,
        showAddGroupModal: modalState
    }
}

function setShowMessages(state, showMessageState) {
    return {
        ...state,
        showMessages: showMessageState
    }
}

function sendMessage(state, newMessage) {
    return {
        ...state,
        messages: state.messages.concat(newMessage)
    }
}

function loadMessages(state, messagesToShow) {
    return {
        ...state,
        messages: messagesToShow
    }
}

function setMessageSentFlag(state, isMessageSent: boolean) {
    return {
        ...state,
        messageSentFlag: isMessageSent
    }
}


export default {reducer};
