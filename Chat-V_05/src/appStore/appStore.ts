import {combineReducers, Reducer} from "redux";

import {loginReducer, displayReducer, treeReducer, appReducer, messagesReducer} from './reducers/'
import {IRootReducer} from './stateInterfaces'


export const rootReducer: Reducer<IRootReducer> = combineReducers({
    login: loginReducer.reducer,
    app: appReducer.reducer,
    tree: treeReducer.reducer,
    messages: messagesReducer.reducer,
    display: displayReducer.reducer
});




