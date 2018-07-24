import * as React from "react";
import TreeLoader from '../treeLoader/treeLoader'
import {IGlobalState, ITreeStateProps} from "../../appStore";
import {connect} from "react-redux";


class SideBar extends React.Component <ITreeStateProps, {}> {


    constructor(props: any) {
        super(props);

    }


    public render() {

        return <div className="sideBar">
            {this.props.updateTree ? <TreeLoader/> : null}

        </div>;
    }
}


function mapStateToProps(state: IGlobalState) {
    return {
        updateTree: state.tree.updateTree

    }
}


export default connect(mapStateToProps, null)(SideBar);