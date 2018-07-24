import * as React from "react";
import {Component} from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {actions,IGlobalState, ILoginStateProps} from "../../appStore/";
import {store} from "../../index";
import {ITreeStateProps} from "../../appStore";





class LendingModal extends Component<ITreeStateProps, {}> {


    constructor(props: any) {
        super(props);


    }


    public render() {
        return (
            <div className="lending-overlay">
                <div className="lending-content">
                    <div className="lendingDialog">
                        <div className="wrapper">
                            <div className="form-lending">
                                <h2 className="form-lending-heading">Welcome to <br/> <span>{this.props.selectedEntity.name} page</span></h2>
                            </div>
                            <div className={"form-instruct"}>CLICK - <img src={"pics/i-message.png"}/>  to start chatting
                            <br/>{this.props.selectedEntity.type === 'group'?
                                    <span>or <img src={"pics/down-arrow.png"}/>  to see sub groups and users</span>:null}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



function mapStateToProps(state: IGlobalState) {
    return {
    selectedEntity : state.tree.selectedEntity
    }
}



export default connect(mapStateToProps, null)(LendingModal);