import * as React from "react";
import {connect} from "react-redux";
import {actions, IDisplayStateProps, IGlobalState} from "../../appStore";
import {Component} from "react";


class TitleBar extends Component<IDisplayStateProps, {}> {

    constructor(props: any) {
        super(props);

    }

    public handleLogout = () => {
        this.props.logOut();

    };
    public handleSignOutClick = () => {
        this.props.setSignOutMode(true)
    };
    public handleAddGroupClick = () => {
        this.props.showAddGroup(true)
        this.props.setPublicGroupMode(true)

    };

    public render() {

        return <div className="titleBar">

            <div className="nav">
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <p onClick={this.handleAddGroupClick}>Add public group</p>
                        <p onClick={this.handleLogout}>log out</p>
                        <p onClick={this.handleSignOutClick}>Sign out</p>
                    </div>
                </div>

                <p className="usernameDisplay">{this.props.topLine}</p>
            </div>
            <span className="chatWith">Chat with : {this.props.chatWith}</span>
        </div>;

    }
}

function mapStateToProps(state: IGlobalState) {
    return {
        topLine: state.display.userDetailsLine,
        chatWith: state.display.chatWithLine

    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.logOut()),
        setSignOutMode: (ModalState: boolean) => dispatch(actions.setSignOutMode(ModalState)),
        showAddGroup: (modalState) => dispatch(actions.setAddGroupModal(modalState)),
        setPublicGroupMode: (publicGroupState) => dispatch(actions.setPublicGroupMode(publicGroupState))


    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);

