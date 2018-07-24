import {Group} from '../mongodb/models/group'
import {User} from "../mongodb/models/user";

export class GroupService {


    public static async newGroup(groupData) {
        try {
            if (groupData.name === "") {
                throw new Error("groups name is not valid")
            }

            else {
                let newGroup = new Group(groupData);



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
                    const publicgroups = await Group.find({public:'yes'});
                    const dupIndicator = publicgroups.findIndex(group=>group.name===groupData.name)
                    if (dupIndicator===-1) {
                        const publicGroup = await newGroup.save();
                        const groupAdmin = await User.findById(groupData.admin);
                        await publicGroup.addUser(groupAdmin)
                    }
                    else {
                        throw new Error("There's already public group with the same name")

                    }

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

            const groups = await   Group.find({}, 'name public admin groups users type messages')
                .populate('users','name').lean()
                .populate('groups','name').lean()
                .populate('messages').lean()
                .exec();
            return groups
        }


        catch (e) {
            throw new Error(e.message)
        }
    }

}
