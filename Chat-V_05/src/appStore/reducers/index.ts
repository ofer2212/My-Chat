import treeReducer from "./treeReducer";
import appReducer from "./appReducer";
import displayReducer from "./displayReducer";
import loginReducer from "./loginReducer";
import messagesReducer from './messagesReducer'

import {initialAppState} from "./appReducer";
import {initialDisplayState} from "./displayReducer";
import {initialLoginState} from "./loginReducer";
import {initialMessagesState} from "./messagesReducer";
import {initialTreeState} from "./treeReducer";
import {IRootReducer} from "../stateInterfaces";

export const rootState: IRootReducer = {
    login: initialLoginState,
    app: initialAppState,
    tree: initialTreeState,
    messages: initialMessagesState,
    display: initialDisplayState
};

export {treeReducer, appReducer, displayReducer, loginReducer, messagesReducer}

