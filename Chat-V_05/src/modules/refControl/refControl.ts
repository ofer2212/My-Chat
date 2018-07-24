
export class RefControl {


    // public static processRefs(data: IClientData) {
    //     data.refs.forEach((ref: IRef) => {
    //         const parentIndex = data.groups.findIndex(group => group.id === ref.parentId);
    //         const childIndex = data[ref.childType].findIndex((entity: IGroup | IUser) => {
    //             return (entity.id === ref.childId)
    //         });
    //         // console.log(childIndex,parentIndex);
    //
    //         if (childIndex !== -1 && parentIndex !== -1) {
    //             data.groups[parentIndex].items.push(data[ref.childType][childIndex])
    //         }
    //     })
    // }
    //
    // public static deleteByRefs(currentParent: IGroup, currentChildIndex: number, refChangeLog: IClientComparedRefs) {
    //     refChangeLog.deletedRefs.some((ref: IRef) => {
    //         if (ref.parentId === currentParent.id && currentParent.items[currentChildIndex] &&
    //             ref.childId === currentParent.items[currentChildIndex].id) {
    //             currentParent.items.splice(currentChildIndex, 1);
    //             return true
    //         }
    //         return false
    //     });
    // }
    //
    // public static addByRef(currentParent: IGroup, currentChildIndex: number, data: IClientData, refChangeLog: IClientComparedRefs) {
    //     refChangeLog.newRefs.some((ref: IRef) => {
    //         if (ref.parentId === currentParent.id) {
    //             const newChildIndex = data[ref.childType].findIndex((child) => child.id === ref.childId);
    //             if (newChildIndex !== -1) {
    //                 currentParent.items.push(data[ref.childType][newChildIndex]);
    //             }
    //             return true
    //         }
    //         return false
    //     });
    // }
    //
    // public static compareRefs(oldRefs: IRef[], newRefs: IRef[]): IClientComparedRefs {
    //
    //     const result: IClientComparedRefs = {deletedRefs: [], newRefs: []};
    //     let deletedIndex = 0;
    //     let itrOneDone = false;
    //     newRefs.forEach(newRef => {
    //             result.newRefs.push(newRef);
    //             oldRefs.forEach(oldRef => {
    //                 itrOneDone ? deletedIndex = -1 : (() => {
    //                     result.deletedRefs.push(oldRef);
    //                     deletedIndex = newRefs.findIndex(ref => ref.id === oldRef.id);
    //                 })();
    //                 if (oldRef.id === newRef.id) {
    //                     result.newRefs.pop()
    //                 }
    //                 if (deletedIndex !== -1) {
    //                     result.deletedRefs.pop()
    //                 }
    //             });
    //             itrOneDone = true
    //         }
    //     );
    //     return result;
    // }

}