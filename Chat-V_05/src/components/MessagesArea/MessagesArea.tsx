import * as React from "react";
import {connect} from "react-redux";
import Message from "../message/message";
import {store} from "../../index";
import {IMessage} from "../../../server";
import GroupModal from './groupModal'
import {actions, IGlobalState, ITreeStateProps} from "../../appStore";
import AddGroupModal from './addGroupModal'
import DeleteGroupModal from './deleteGroupModal'
import LendingModal from './lendingModal'
class MessagesArea extends React.Component<ITreeStateProps, {}> {

    constructor(props: any) {
        super(props);

    }

    public showLendingModal = () => {
        if (this.props.showLendingModal) {
            return <LendingModal/>
        }
        return null
    };
    public showAddGroupModal = () => {
        if (this.props.showAddGroupModal) {
            return <AddGroupModal/>
        }
        return null
    };
    public showDeleteGroupModal = () => {
        if (this.props.showDeleteGroupModal) {
            return <DeleteGroupModal/>
        }
        return null
    };

    public handleAddGroup = () => {
        this.props.showAddGroup(true)
    };
    public handleDeleteGroup = () => {
        this.props.showDeleteGroup(true)

    };
    public handleLeaveGroup = () => {
        const storeData: IGlobalState = store.getState();
        this.props.leave(storeData.app.user._id, storeData.tree.selectedEntity._id)
    };


    public processMessages = (msgArr: IMessage[]) => {
        const storeData: IGlobalState = store.getState();
        if (msgArr) {
            return (<div className="messagesDiv">
                    <ul className="chats">

                        {
                            msgArr.map((msg, index) =>
                                <Message isMember={storeData.tree.isMemberOfGroup} key={index} message={msg}
                                         currentUserId={storeData.app.user._id}/>
                            )
                        }
                    </ul>
                </div>
            );
        }
        return (<ul/>)
    };


    public checkIfMember() {
        const storeData: IGlobalState = store.getState();
        if (storeData.tree.selectedEntity.type === "group" && !this.props.isMemberOfGroup && !this.props.showLendingModal) {
            return <GroupModal/>
        }
        return null
    }

    public checkIfGroup() {
        const storeData: IGlobalState = store.getState();
        if (storeData.tree.selectedEntity.type === "group") {
            return <div className="group-dropdown">
                <button className="group-dropbtn">Group options</button>
                <div className="group-dropdown-content">
                    <p onClick={this.handleAddGroup}>Add group in here</p>
                    <p onClick={this.handleLeaveGroup}>Leave group</p>
                    <p onClick={this.handleDeleteGroup}>Delete Group</p>

                </div>
            </div>
        }
        return null
    }

// {this.checkIfMember()}


    public render() {


        return <div className="messagesArea">
            {this.checkIfGroup()}
            {this.checkIfMember()}
            {this.showLendingModal()}
            {this.showAddGroupModal()}
            {this.showDeleteGroupModal()}
            {this.props.showMessages ? this.processMessages(this.props.messages) : null}
        </div>;
    }
}


function mapStateToProps(state: IGlobalState) {
    return {
        //    chatWith :state.tree.selectedEntity,
        messages: state.messages.messages,
        showMessages: state.messages.showMessages,
        isMemberOfGroup: state.tree.isMemberOfGroup,
        showAddGroupModal: state.messages.showAddGroupModal,
        showDeleteGroupModal: state.messages.showDeleteGroupModal,
        showLendingModal:state.display.showLendingModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        leave: (userId, groupId) => dispatch(actions.leaveGroup(userId, groupId)),
        showAddGroup: (modalState) => dispatch(actions.setAddGroupModal(modalState)),
        showDeleteGroup: (modalState) => dispatch(actions.setDeleteGroupModal(modalState))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea);


