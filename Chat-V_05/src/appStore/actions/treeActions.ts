import {Api} from "../../serverApi";
import * as actionTypes from "./actionTypes";
import {TreeControl} from "../../modules";
import {IClientData, IGroup, IUser} from "../../../server/";
import {actions} from '../../appStore'
import {store} from "../../index";


export function loadTree(userId: string): any {
    return async dispatch => {
        try {
            const data: IClientData = {
                users: await  Api.get('/user'),
                groups: await   Api.get('/group'),
                user: await  Api.get(`/user/${userId}`)
            };
            const tree = TreeControl.createTree(data);
            dispatch({type: actionTypes.LOAD_TREE, newTree: tree});
            dispatch({type: actionTypes.STORE_TEMP_DATA, tmpData: data});
            dispatch({type: actionTypes.SHOW_TREE})


        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
        }

    };
}

export function expandGroup(group: IGroup, index: number): any {
    return dispatch => {
        const storeData = store.getState();
        const currentTree = storeData.tree.tree;
        console.log(currentTree+'\n\n');

        const mergedEntities = group.users;
        const finalGroupContent = [];
        Array.prototype.push.apply(mergedEntities, group.groups);
        mergedEntities.forEach(entity => {
            finalGroupContent.push(TreeControl.getEntityById(entity._id, storeData.tree.tempData))
        });

        currentTree.splice(index + 1, 0, ...finalGroupContent);
        dispatch({type: actionTypes.LOAD_TREE, newTree: currentTree});
        dispatch({type: actionTypes.SHOW_TREE})  ;


        const storeData2 = store.getState();
        console.log(storeData2.tree.tree);

        //  dispatch({type: actionTypes.SET_UPDATE_TREE, updateState: true})


    };
}

export function collapsGroup(groupId): any {
    return dispatch => {

        //  dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: memberState});

    };
}

export function removeItem(memberState: boolean): any {
    return dispatch => {

        //   dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: memberState});

    };
}

export function addItem(memberState: boolean): any {
    return dispatch => {

        //   dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: memberState});

    };
}

export function updateTree(oldData: IClientData, tree: Array<IGroup | IUser>): any {
    // return async dispatch => {
    //     try {
    //         const newData: IClientData = {
    //             users: await  Api.get('/tree/users'),
    //             groups: await   Api.get('/tree/groups'),
    //             refs: await  Api.get('/tree/refs')
    //         };
    //         TreeControl.updateTree(tree, newData, oldData);
    //         dispatch({type: actionTypes.LOAD_TREE, newTree: tree});
    //         dispatch({type: actionTypes.STORE_TEMP_DATA, tempData: newData});
    //
    //     }
    //     catch (e) {
    //         dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
    //     }
    //
    // };
}

export function setIsMember(memberState: boolean): any {
    return dispatch => {

        dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: memberState});

    };
}

export function removeTree(showTree: boolean): any {
    return dispatch => {

        dispatch({type: actionTypes.REMOVE_TREE, treeState: showTree});

    };
}

export function setSelectedEntity(selectedID, lastSelectionID, selectedType): any {
    return dispatch => {

        const sessionData = store.getState();
        const selectedEntity = TreeControl.getEntityById(selectedID, sessionData.tree.tempData);
//console.log(selectedEntity)
        dispatch({type: actionTypes.SET_SELECTED_ENTITY, selectedEntity: selectedEntity});

        dispatch(actions.setChatWithLine(selectedEntity.name));
        dispatch(actions.setShowLendingModal(true));
        dispatch(actions.loadMessages(selectedEntity._id));
        // dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: true});

        //     try {
        //         const selected: IUser | IGroup = TreeControl.getItemByPath(tree, selectionPath);
        //         if (selected.id !== lastSelection.id) {
        //             dispatch({type: actionTypes.SET_SHOW_MESSAGE, showMessageState: false});
        //             dispatch({type: actionTypes.SET_SELECTED_ENTITY, selectedEntity: selected});
        //             dispatch(actions.setChatWithLine(selected.name));
        //             if (selected.type === "group") {
        //                 const isInGroup = await Api.post('/user/existin', {userId: currentUser.id, groupId: selected.id});
        //                 console.log("selected Type is group", isInGroup, "id = " + selected.id);
        //
        //                 if (isInGroup === "yes") {
        //                     dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: true});
        //                 }
        //                 else if (isInGroup === "no") {
        //                     dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: false});
        //                 }
        //            dispatch(actions.loadMessages(currentUser.id, selected.id))
        //             }
        //             else if (selected.type === "user") {
        //                 dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: true});
        //                 dispatch(actions.loadMessages(currentUser.id, selected.id))
        //             }
        //         }
        //     }
        //
        //     catch (e) {
        //         dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
        //
        //     }

        //  }
    }
}



