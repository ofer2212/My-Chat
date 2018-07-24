import * as React from "react";
import {Component} from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {actions,IGlobalState, ILoginStateProps} from "../../appStore/";
import {store} from "../../index";





class DeleteGroupModal extends Component<ILoginStateProps, {}> {


    constructor(props: any) {
        super(props);

        this.handleYesBtnClick = this.handleYesBtnClick.bind(this);
        this.handleNoBtnClick = this.handleNoBtnClick.bind(this);

    }



    public handleNoBtnClick  ()  {
        this.props.showDeleteGroup(false)
    };




    public handleYesBtnClick  ()  {
            const storeData: IGlobalState = store.getState();
            this.props.deleteGroup(storeData.tree.selectedEntity._id);
    };




    public render() {
        return (
            <div className="addgroup-overlay">
                <div className="addgroup-content">
                    <div className="addgroupDialog">
                        <div className="addwrapper">
                            <div className="addform-group">
                                <h4 className="addform-group-heading">are you sure you want to delete this group ?</h4>
                                <p>{this.props.error}</p>
                                <Button onClick={this.handleYesBtnClick}
                                        className="addbtnYes"
                                        outline color="primary">Delete</Button>
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
        error:state.app.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGroup:(groupId)=>dispatch(actions.deleteGroup(groupId)),
        showDeleteGroup:(modalState)=>dispatch(actions.setDeleteGroupModal(modalState))

    }
};

export default connect(null,mapDispatchToProps)(DeleteGroupModal);