import * as actionTypes from "./actionTypes";
import {actions} from  '../../appStore'
import {Api} from "../../serverApi";


export function joinGroup(addUserId: string, toGroupId: string): any {
    return async dispatch => {
        try {
            const resMSg = await Api.put(`/user/join`, {userId: addUserId, groupId: toGroupId});

            dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: true});
            //  dispatch({type: SET_SHOW_MESSAGE, showMessageState: true});


        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
        }

    };
}

export function leaveGroup(removeUserId: string, fromGroupId: string): any {
    return async dispatch => {
        try {
            const resMSg = await Api.deleteBody(`/user/leave`, {userId: removeUserId, groupId: fromGroupId});

            dispatch({type: actionTypes.SET_IS_MEMBER_OF, isMember: false});
            //  dispatch({type: SET_SHOW_MESSAGE, showMessageState: true});


        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
        }

    };
}
export function addSubGroup(ParentId: string, newGroupName: string,  adminId: string , isPublic: string,): any {
    return async dispatch => {
        try {
            const resMSg = await Api.put(`/group/new_group`, {
                name: newGroupName,
                public: isPublic,
                admin: adminId,
                parent: ParentId
            });
            console.log("add msg",resMSg);
            if (resMSg === "done") {
                dispatch({
                    type: actionTypes.SHOW_ADD_GROUP_MODAL, modalState: false
                });
                dispatch(actions.setPublicGroupMode(false))
            }
            else {
                dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: resMSg});

            }

        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
        }

    };
}

export function deleteGroup(groupId: string): any {
    return async dispatch => {
        try {
            const resMSg = await Api.delete(`/group/delete/${groupId}`);
            if (resMSg === "done") {
                dispatch({
                    type: actionTypes.SHOW_DELETE_GROUP_MODAL, modalState: false
                })
            }
            else {
                console.log(resMSg);
                dispatch({type: actionTypes.SET_ERROR_MESSAGE, errMsg: resMSg});

            }

        }
        catch (e) {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: e.message});
        }

    };
}
