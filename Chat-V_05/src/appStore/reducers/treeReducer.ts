import {actionTypes} from '../../appStore'
import {ITreeStateProps} from "../stateInterfaces";
import {Reducer} from "redux";
import {IClientData} from "../../../server/sharedInterfaces";

export const initialTreeState: ITreeStateProps = {
    renderTree: false,
    treeArrowControl: false,
    tree:[],
    tempData:null,
    selectedEntity:{},
    isMemberOfGroup:false,
    updateTree:true
};


export  const reducer:Reducer<ITreeStateProps> = (state:ITreeStateProps = initialTreeState, action) => {
    if (action.type === actionTypes.LOAD_TREE) {
        return loadTree(state, action.newTree);
    }
    if (action.type === actionTypes.SHOW_TREE) {
        return showTree(state);
    }
    if (action.type === actionTypes.SET_SELECTED_ENTITY) {
        return setSelected(state,action.selectedEntity);
    }
    if (action.type === actionTypes.REMOVE_TREE) {
        return removeTree(state,action.treeState);
    }

    if (action.type === actionTypes.SET_ARROW_CONTROL) {
        return setArrows(state, action.arrowsOn);
    }

    if (action.type === actionTypes.STORE_TEMP_DATA) {
        return storeTempData(state, action.tmpData);
    }
    if (action.type === actionTypes.SET_IS_MEMBER_OF) {
        return setIsMemberOf(state, action.isMember);
    }
    if (action.type === actionTypes.SET_UPDATE_TREE) {
        return setUpdateTree(state, action.updateState);
    }

    return state;
};

function setUpdateTree(state, updateState) {
    return {
        ...state,
        updateTree: updateState
    }
}

function setIsMemberOf(state, isMember) {
    return {
        ...state,
        isMemberOfGroup: isMember
    }
}
function loadTree(state, newTree) {
    return {
        ...state,
        tree: newTree
    }
}
function showTree(state) {
    return {
        ...state,
        renderTree: true
    }
}
function removeTree(state,treeState) {
    return {
        ...state,
        tree: [],
        renderTree: treeState

    }
}
function setArrows(state, arrowsOn) {
    return {
        ...state,
        treeArrowControl: arrowsOn
    }
}

function storeTempData(state, tmpData) {
    return {
        ...state,
        tempData: tmpData
    }
}
function setSelected(state, selected) {
    return {
        ...state,
        selectedEntity: {...selected}
    }
}


export default {reducer};
