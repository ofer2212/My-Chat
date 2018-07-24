import {User} from '../mongodb/models/user'
import {Group} from '../mongodb/models/group'

export class UserService {


    public static async deleteUser(userId: string) {
        try {
            if (!userId) {
                throw new Error("missing user Id")
            }
            else {
                const targetUser = await  User.findOne({_id: userId});
                if (targetUser) {
                    await targetUser.remove()
                }
                else {
                    throw new Error("cant find specified user")

                }

            }

        }
        catch (e) {
            throw new Error(e.message)
        }
    }

    public static async newUser(user) {
        try {
            if (user.password === "") {
                throw new Error("Provided Password is empty")
            }
            if (user.name === "") {
                throw new Error("Provided name is empty")

            }
            else {
                const newUser = new User(user);
                await newUser.save();
            }
        }
        catch (e) {
            throw new Error(e.message)
        }
    }

    public static async joinGroup(userId: string, groupId: string) {
        try {
            if (userId === "" || groupId === "") {
                throw new Error("user or group id is missing")
            }
            else {
                const targetGroup = await Group.findById({_id: groupId});
                const targetUser = await  User.findOne({_id: userId});

                if (targetGroup && targetUser) {
                    await targetGroup.addUser(targetUser)
                }

            }
        }
        catch (e) {
            throw new Error(e.message)
        }
    }

    public static async leaveGroup(userId: string, groupId: string) {
        try {
            if (userId === "" || groupId === "") {
                throw new Error("user or group id is missing")
            }
            else {
                console.log("uid - ", userId, "gid - ", groupId);
                const targetGroup = await Group.findById({_id: groupId});
                const targetUser = await  User.findOne({_id: userId});

                if (targetGroup && targetUser) {
                    await targetGroup.removeUser(targetUser)
                }
            }
        }

        catch (e) {
            throw new Error(e.message)
        }
    }

    public static async getUsers() {
        try {

            const users = await User
                .find({}, 'name age online gender type');
            return users
        }


        catch (e) {
            throw new Error(e.message)
        }
    }

    public static async getUser(id:string) {
        try {

             const currentUser = await User
                .find({_id:id}, 'name age online gender messages type')
                .populate('messages')

                .exec();
            return currentUser
        }


        catch (e) {
            throw new Error(e.message)
        }
    }

}

