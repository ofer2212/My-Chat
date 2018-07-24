import * as React from "react";
import {Component, RefObject} from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {actions, IGlobalState, ILoginStateProps} from "../../appStore";
import {store} from "../../index";


class AddGroupModal extends Component<ILoginStateProps, {}> {
    public groupNameInputElement: RefObject<HTMLInputElement>;


    constructor(props: any) {
        super(props);
        this.groupNameInputElement = React.createRef();

        this.handleYesBtnClick = this.handleYesBtnClick.bind(this);
        this.handleNoBtnClick = this.handleNoBtnClick.bind(this);

    }


    public handleNoBtnClick() {
        this.props.showAddGroup(false)
    };


    public handleYesBtnClick() {
        if (this.groupNameInputElement.current.value) {
            const storeData: IGlobalState = store.getState();
            if (storeData.display.newPublicGroupMode) {
                this.props.addGroup("", this.groupNameInputElement.current.value,
                    storeData.app.user._id,"yes");
            }
            else {
                this.props.addGroup(storeData.tree.selectedEntity._id,
                    this.groupNameInputElement.current.value,storeData.app.user._id,"no");
            }
        }
    };


    public render() {
        return (
            <div className="addgroup-overlay">
                <div className="addgroup-content">
                    <div className="addgroupDialog">
                        <div className="addwrapper">
                            <div className="addform-group">
                                <h4 className="addform-group-heading">Enter Group name</h4>
                                <p>{this.props.error}</p>
                                <input type="text" className="addform-control"
                                       name="groupname" placeholder="Group name"
                                       ref={this.groupNameInputElement}/>
                                <Button onClick={this.handleYesBtnClick}
                                        className="addbtnYes"
                                        outline color="primary">Add</Button>
                                <Button onClick={this.handleNoBtnClick}
                                        className="addbtnaNo"
                                        outline color="primary">Cancel</Button>
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
        error: state.app.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addGroup: (parentId, childName, admin, isPublic) =>
            dispatch(actions.addSubGroup(parentId, childName, admin,isPublic)),
        showAddGroup: (modalState) => dispatch(actions.setAddGroupModal(modalState)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupModal);