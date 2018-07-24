import * as React from "react";
import {Component, StatelessComponent} from 'react'
import {Route} from "react-router-dom";
import Chat from "./containers/chat/chat";
import LoginModal from "./containers/loginModal/loginModal";
import {IAppStateProps, IGlobalState} from "./appStore/stateInterfaces";
import {connect} from "react-redux";
import SignOutModal from './components/TitleBar/signOutModal'


class App extends Component<IAppStateProps, {}> {

    public loginComponent: StatelessComponent<any>;
    public chatComponent: StatelessComponent<any>;
    public signOutComponent: StatelessComponent<any>;

    constructor(props: any) {
        super(props);
        this.loginComponent = () => <LoginModal/>;
        this.chatComponent = () => <Chat/>;
        this.signOutComponent = () => <SignOutModal/>;

    }


    public render() {
        return (
            <div className="App">
                <Route exact path="/" component={this.chatComponent}/>
                {!(this.props.auth) ? <Route path="/" component={this.loginComponent}/> : null}
                {(this.props.signOutModal) ? <Route path="/" component={this.signOutComponent}/> : null}
            </div>

        );
    }
}


function mapStateToProps(state: IGlobalState) {
    return {
        auth: state.login.auth,
        mainError: state.app.error,
        signOutModal: state.login.isSignOutMode

    }
}


export default connect(mapStateToProps, {})(App);



