import * as React from "react";
import {Component, RefObject} from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {actions, ILoginStateProps} from "../../appStore/";
import {store} from "../../index";





class SignOutModal extends Component<ILoginStateProps, {}> {

    public nameInputElement: RefObject<HTMLInputElement>;
    public passwordInputElement: RefObject<HTMLInputElement>;
    public ageInputElement: RefObject<HTMLInputElement>;



    constructor(props: any) {
        super(props);

        this.handleYesBtnClick = this.handleYesBtnClick.bind(this);
        this.handleNoBtnClick = this.handleNoBtnClick.bind(this);

    }








    public handleYesBtnClick  ()  {
   const currentState = store.getState();
        this.props.setSignOutMode(false);
        this.props.signOut(currentState.app.user.id);

    };

    public handleNoBtnClick() {
    this.props.setSignOutMode(false)
    }



    public render() {
        return (
            <div className="login-overlay">
                <div className="login-content">
                    <div className="loginDialog">
                        <div className="wrapper">
                            <div className="form-signin">
                                <h2 className="form-signin-heading">are you sure you want to sign out ? <br/> this will delete your account</h2>
                                <Button onClick={this.handleYesBtnClick}
                                        id="btnSignUp"
                                        outline color="primary">Yes</Button>
                                <Button onClick={this.handleNoBtnClick}
                                        id="btnLogin"
                                        outline color="primary">
                                    No</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        signOut: (userId) => dispatch(actions.signOut(userId)),
        setSignOutMode:(ModalState:boolean)=>dispatch(actions.setSignOutMode(ModalState))
    }
};

export default connect(null,mapDispatchToProps)(SignOutModal);