import {Group} from '../mongodb/models/group'

export class GroupService {


    public static async newGroup(groupData) {
        try {
            if (groupData.name === "") {
                throw new Error("groups name is not valid")
            }

            else {

                const newGroup = new Group(groupData);

                if (groupData.public === "no" && groupData.parent !== "") {
                    const parentGroup = await Group.findById(groupData.parent)
                        .populate('groups', "name").exec();
                    const indexIndicator = parentGroup.groups
                        .findIndex(currentGroup => currentGroup.name === groupData.name);
                    if (indexIndicator !== -1) {
                        throw new Error("this group already contain group with the same name")
                    }
                    else {
                        const generatedGroup = await newGroup.save();
                        await parentGroup.addSubGroup(generatedGroup)
                    }
                }
                else if (groupData.public === "yes") {
                    await newGroup.save();
                }
                else {
                    throw new Error ("something went wrong - \n" + groupData.name )
                }
            }
        }
        catch (e) {
            throw new Error(e.message)
        }
    }


    public static async deleteGroup(groupId: string) {
        try {
            if (groupId === "") {
                throw new Error("missing group Id")
            }
            else {
                const targetGroup = await  Group.findOne({_id: groupId});
                if (targetGroup) {
                    await targetGroup.remove()
                }
                else {
                    throw new Error("cant find specified group")

                }

            }
        }
        catch (e) {
            throw new Error(e.message)
        }
    }

    public static async getGroups() {
        try {

            const groups = await   Group.find({}, 'name public admin groups users')
                .populate('users','username')
                .populate('groups','name')
                .exec();
            return groups
        }


        catch (e) {
            throw new Error(e.message)
        }
    }

}
