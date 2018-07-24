import * as React from "react";
import {Component} from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {actions,IGlobalState, ILoginStateProps} from "../../appStore/";
import {store} from "../../index";





class GroupModal extends Component<ILoginStateProps, {}> {


    constructor(props: any) {
        super(props);

        this.handleYesBtnClick = this.handleYesBtnClick.bind(this);

    }








    public handleYesBtnClick  ()  {
const storeData:IGlobalState = store.getState();
this.props.joinGroup(storeData.app.user._id,storeData.tree.selectedEntity._id)
    };




    public render() {
        return (
            <div className="group-overlay">
                <div className="group-content">
                    <div className="groupDialog">
                        <div className="wrapper">
                            <div className="form-group">
                                <h2 className="form-group-heading">Not a member<br/>Want to join?</h2>
                                <Button onClick={this.handleYesBtnClick}
                                        id="btnJoinYes"
                                         outline color="primary">Yes</Button>

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
        joinGroup:(userId,groupId)=>dispatch(actions.joinGroup(userId,groupId))
    }
};

export default connect(null,mapDispatchToProps)(GroupModal);