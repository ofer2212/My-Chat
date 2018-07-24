import {RefControl} from "../refControl/refControl";
import {IClientData, IGroup, IUser} from "../../../server";
import {store} from "../../index";


export class TreeControl {

    public static createTree(newData: IClientData) {
        return this.generateTree(newData)
    }

    public static updateTree(tree: Array<IGroup | IUser>, newData: IClientData, oldData: IClientData) {
        //
        // this.refsChangeLog = RefControl.compareRefs(oldData.refs, newData.refs);
        // this.updateLoop({items: tree}, 0, this.updateCallback, newData)
    }

    public static isMember() {
        const storeData = store.getState();
        const groupUsers = storeData.tree.selectedEntity.users;
        const currentUserId = storeData.app.user._id;
        return (groupUsers.findIndex(user => user._id === currentUserId) !== -1)
    }


    public static getItemByPath(tree: any, address: number[]) {
        const length = address.length;
        const parentGroup = {items: tree};
        if (length === 0) {
            return parentGroup
        }
        let finalItem = parentGroup.items[address[0]];
        for (let index = 1; index < length; index++) {
            finalItem = finalItem.items[address[index]]
        }
        return finalItem

    }

    public static getEntityById(id, data) {
        const mergedEntities = data.users;
        Array.prototype.push.apply(mergedEntities, data.groups);
        const entityIndex = mergedEntities.findIndex(entity => entity._id === id);
        return mergedEntities[entityIndex]
    }

    // private static refsChangeLog: IClientComparedRefs;

    private static generateTree(data: IClientData) {
        try {
            const finalTree: Array<IGroup | IUser> = [];
            console.log("from tree control - \n\n", data);
            data.groups.forEach((group) => {
                if (group.public === 'yes') {
                    finalTree.push(group)
                }
            });
            Array.prototype.push.apply(finalTree, data.users);
            return finalTree
        }
        catch (e) {
            throw new Error("Cannot build tree")
        }
    }


    private static build(data: IClientData, finalTree: Array<IGroup | IUser>) {
        // data.groups.forEach((group: IGroup) => {
        //     if (group.position === "base") {
        //         finalTree.push(group);
        //     }
        // });
        // Array.prototype.push.apply(finalTree, data.users);
        // // finalTree.concat(data.users)

    }

    private static updateCallback(currentParent: IGroup, currentChildIndex: number, data: IClientData) {
        // RefControl.deleteByRefs(currentParent, currentChildIndex, TreeControl.refsChangeLog);
        // RefControl.addByRef(currentParent, currentChildIndex, data, TreeControl.refsChangeLog);
    }

    private static updateLoop(parentGroup: any, level: number, manipulateCallback, data: IClientData) {
        level += 1;
        const numOfItems: number = parentGroup.items.length;
        for (let index: number = 0; index < numOfItems; index++) {
            if (parentGroup.items[index] && parentGroup.items[index].type === "group") {
                this.updateLoop(parentGroup.items[index], level, manipulateCallback, data);
                manipulateCallback(parentGroup, index, data);
                continue
            }
            manipulateCallback(parentGroup, index, data);
        }
    }


}