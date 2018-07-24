import App from './App';
import * as React from 'react';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import * as ReactDOM from 'react-dom';
import {rootReducer, rootState} from "./appStore";
import {applyMiddleware, createStore} from "redux";
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './StyleSheets/titleDropDown.css';
import './StyleSheets/groupDropDown.css';
import './StyleSheets/addGroupModal.css';
import './StyleSheets/lendingModal.css';
import './StyleSheets/MessageInput.css';
import './StyleSheets/groupModal.css';
import './StyleSheets/loginModal.css'
import './StyleSheets/entity.css';
import './StyleSheets/Layout.css'
import './StyleSheets/index.css';


import {composeWithDevTools} from 'redux-devtools-extension';

const Modal = () => (
    <Router>
        <Route component={App}/>
    </Router>
);
//  redux dev tools
// export const store = createStore(
//    rootReducer,
//     rootState,
//     composeWithDevTools(
//         applyMiddleware(thunk),
//          )
//
//    );

export const store = createStore(
    rootReducer,
    rootState,
    applyMiddleware(thunk),
);


ReactDOM.render(
    <Provider store={store}><Modal/></Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
