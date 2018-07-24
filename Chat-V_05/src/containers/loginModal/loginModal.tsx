import * as React from "react";
import {Component, RefObject} from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {actions, IGlobalState, ILoginStateProps} from "../../appStore/";
import {IUserAuth} from "../../../server";


class LoginModal extends Component<ILoginStateProps, {}> {

    public nameInputElement: RefObject<HTMLInputElement>;
    public passwordInputElement: RefObject<HTMLInputElement>;
    public ageInputElement: RefObject<HTMLInputElement>;
    public maleInputElement: RefObject<HTMLInputElement>;
    public femaleInputElement: RefObject<HTMLInputElement>;


    constructor(props: ILoginStateProps) {
        super(props);
        this.nameInputElement = React.createRef();
        this.passwordInputElement = React.createRef();
        this.ageInputElement = React.createRef();
        this.maleInputElement = React.createRef();
        this.femaleInputElement = React.createRef();

        this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
        this.handleSignUpBtnClick = this.handleSignUpBtnClick.bind(this);

    }


    public clearTxt() {
        if (this.nameInputElement.current &&
            this.passwordInputElement.current &&
            this.ageInputElement.current) {
            this.nameInputElement.current.value = "";
            this.passwordInputElement.current.value = "";
            this.ageInputElement.current.value = "";
        }
    }


    public handleLoginBtnClick() {
        if (this.props.isSignUp) {
            this.props.changeToLogin();
            this.clearTxt();
        }
        else {
            if (this.nameInputElement.current && this.passwordInputElement.current) {
                this.props.validate({
                    name: this.nameInputElement.current.value,
                    password: this.passwordInputElement.current.value
                });


            }
        }


    };

    public handleSignUpBtnClick() {
        if (this.props.isSignUp) {

            let femaleInput = this.femaleInputElement.current;
            let maleInput = this.maleInputElement.current;
            let gender;
            if (this.nameInputElement.current && this.passwordInputElement.current && this.ageInputElement.current) {
                if (gender = (femaleInput.checked && femaleInput.value) || (maleInput.checked && maleInput.value)) {
                    this.props.signUp(
                        this.nameInputElement.current.value,
                        this.passwordInputElement.current.value,
                        this.ageInputElement.current.value, gender
                    );
                    this.passwordInputElement.current.value = "";
                }

                //     if (this.validateFields()) {
                //         this.signUpProcess = false;
                //         this.clearTxt();
                //         this.setAgeInput(false);
                //         this.setBtnLoginTxt("Login");
            }
        }
        else {

            this.props.changeToSignUp();
        }
    }


    public render() {
        return (
            <div className="login-overlay">
                <div className="login-content">
                    <div className="loginDialog">
                        <div className="wrapper">
                            <div className="form-signin">
                                <h2 className="form-signin-heading">Please login</h2>
                                <p>{this.props.error}</p>
                                <input type="text" className="form-control"
                                       name="username" placeholder="username"
                                       ref={this.nameInputElement}/>
                                <input type="password" className="form-control"
                                       name="password" placeholder="password"
                                       ref={this.passwordInputElement}/>
                                <input type="number" className="form-control"
                                       name="age" placeholder="age"
                                       hidden={!this.props.ageInputState}
                                       ref={this.ageInputElement}/>
                                <span hidden={!this.props.ageInputState}>
                                  <input type="radio"
                                         value="male"
                                         name="gender"
                                         ref={this.maleInputElement}/>Male
                                <input type="radio"
                                       value="female"
                                       name="gender"
                                       ref={this.femaleInputElement}/>Female
                               </span>
                                <Button onClick={this.handleSignUpBtnClick}
                                        id="btnSignUp"
                                        outline color="primary">Sign Up</Button>
                                <Button onClick={this.handleLoginBtnClick}
                                        id="btnLogin"
                                        outline color="primary">
                                    {this.props.btnLoginTxt}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IGlobalState) {
    return {
        ageInputState: state.login.ageInputFieldState,
        btnLoginTxt: state.login.btnLoginTxt,
        error: state.login.loginError,
        auth: state.login.auth,
        isSignUp: state.login.inSignUpMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeToSignUp: () => dispatch(actions.setSignUpProcess()),
        changeToLogin: () => dispatch(actions.setLoginProcess()),
        validate: (user: IUserAuth) => dispatch(actions.validateUser(user)),
        signUp: (name: string, password: string, age: number, newGender: string) => dispatch(actions.signUp(name, password, age, newGender))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

// export default LoginModal