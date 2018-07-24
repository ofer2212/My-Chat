import * as $ from "jquery";
import * as React from "react";
import ChatTree from '../../modules/chatTreeJq/chatTree'
import {store} from "../../index";
import {connect} from "react-redux";
import {actions, IGlobalState, ITreeStateProps} from "../../appStore";
import {IMessage} from "../../../server";
import {IGroup, IUser} from "../../../server/sharedInterfaces";
import Entity from './entity'
import {ReactEventHandler, ReactHTMLElement} from "react";
import {TreeControl} from "../../modules";


class TreeLoader extends React.Component <ITreeStateProps, {}> {

    public selectedId;
    public tree: any;
    private hangingPoint: HTMLUListElement;


    constructor(props: any) {
        super(props);

    }


    // public  shouldComponentUpdate(){
    //     return this.props.updateTree;
    // }


    // public componentDidMount() {
    //
    //     const treeContainer = $(this.hangingPoint);
    //     this.tree = ChatTree(treeContainer);
    //     $('ul').delegate('li', 'click', (event) => {
    //         this.tree.handleClick(event);
    //         // this.tree.updateTree()
    //         const storeData:IGlobalState = store.getState();
    //         this.props.setSelection(storeData.tree.tree,this.tree.getCurrentElementId(),storeData.app.user,storeData.tree.selectedEntity)
    //        // this.props.selectedEntity(this.tree.getCurrentElementId())
    //     });
    //
    //     $('ul').delegate('li', 'dblclick', (event) => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         this.tree.handleDbClick($(event.currentTarget))
    //     });
    //
    //     $('ul').delegate('li',  'keydown', (event) => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         this.tree.handleDbClick($(event.currentTarget))
    //     });
    //
    // }
    //
    // public handleTreeClick = () => {
    //     document.addEventListener('keydown', () => {
    //         this.tree.handleKeyPress(event);
    //     });
    // };
    public entityClicked(event, id, selectionType) {
        let currentSelection = document.getElementsByClassName(id);
        let lastSelection = document.getElementsByClassName(this.selectedId);
        if (currentSelection !== lastSelection) {
            this.props.setIsMember(false);
            console.log("current selection - ", currentSelection, "\nlast selection - ", lastSelection);
            if (currentSelection.length > 0 && !currentSelection[0].classList.contains("selected")) {
                if (lastSelection.length > 0 && lastSelection[0].classList.contains("selected")) {
                    lastSelection[0].classList.remove("selected")
                }
                currentSelection[0].classList.add("selected");
                console.log("selected Id - ", id);
                this.selectedId = id;
                // console.log("check - ",id,lastSelection,selectionType)
                this.props.setSelection(id, lastSelection, selectionType)
            }
        }
    }

    public messageIconClicked(event, id, selectionType) {
        this.props.setShowLendingModal(false);
        if (selectionType === 'user') {
            this.props.setIsMember(true)
        }
        else if(selectionType === 'group') {
            const check = TreeControl.isMember();
            if (check) {
                console.log('is member');
                this.props.setIsMember(true)
            }
            else {
                console.log('is not member');

                this.props.setIsMember(false)

            }
        }
    }

    public arrowDownClicked(event, id, entity , index) {
        this.props.expandGroup(entity,index);
        this.forceUpdate()
    }

    public processTree = (Tree: Array<IUser | IGroup>) => {
        const storeData: IGlobalState = store.getState();
        console.log("in precess tree ");
        if (Tree.length > 0) {
            return (
                Tree.map((treeItem, index) =>
                    <Entity arrowDownClicked={(event) => this.arrowDownClicked(event, treeItem._id, treeItem ,index)}
                            messageClicked={(event) => this.messageIconClicked(event, treeItem._id, treeItem.type)}
                            onClick={(event) => this.entityClicked(event, treeItem._id, treeItem.type)}
                            entity={treeItem}
                            key={index}/>
                )


            );
        }
        return (<ul/>)
    };


    public render() {
        console.log("in  tree render");

        //   if (this.props.enableTree) {
            const storeData = store.getState();
            this.tree = storeData.tree.tree;
       // }
        return <div className="treeDiv">
            <ul id="leftTree"
                className="left tree">
                {this.props.enableTree ? this.processTree(this.tree) : null}

            </ul>
        </div>
    }


}

// export default TreeLoader

function mapStateToProps(state: IGlobalState) {
    return {
        enableTree: state.tree.renderTree,
        tree:state.tree.tree,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelection: (selection, lastSelection, selectionType) => dispatch(actions.setSelectedEntity(selection, lastSelection, selectionType)),
        setShowLendingModal: (modalState) => dispatch(actions.setShowLendingModal(modalState)),
        setIsMember: (memberState) => dispatch(actions.setIsMember(memberState)),
        expandGroup: (group,index)=>dispatch(actions.expandGroup(group,index))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TreeLoader);
