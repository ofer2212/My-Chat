
import {Message} from '../mongodb/models/message'
import {User} from "../mongodb/models/user";
import {Group} from "../mongodb/models/group";

export class MessageService {


    public static async sendMessage(fromUserId: string, toId: string, msgContent: string) {
        try {
            if (fromUserId === "" || toId === "" || !msgContent) {
                throw new Error("missing user Id")
            }
            else {

                const fromUser = await User.findById(fromUserId).exec();
                const toUser = await User.findById(toId).exec();
                const toGroup = await Group.findById(toId).exec();
                if (fromUser && (toUser || toGroup)) {
                    if (toUser) {
                        console.log("is to user");
                        const userMsg = await new Message({
                            from: fromUser,
                            toUser: toUser,
                            content: msgContent
                        });
                        await userMsg.save();
                        await fromUser.receiveMessage(userMsg);
                        await toUser.receiveMessage(userMsg);
                        return {
                            from: fromUser._id,
                            toUser: toUser._id,
                            content: msgContent
                        }
                    }
                    if (toGroup) {
                        console.log("is to group - ",toGroup);
                        const groupMsg = await new Message({
                            from: fromUser,
                            toGroup: toGroup,
                            content: msgContent
                        });
                        // const res = await groupMsg.populate('toGroup');
                        await groupMsg.save();
                        await toGroup.receiveMessage(groupMsg);
                        return {
                            from: fromUser._id,
                            toGroup: toGroup._id,
                            content: msgContent
                        }
                    }
                }
                else {
                    throw new Error("cant find conversation participants")

                }

            }
        }
        catch (e) {
            throw new Error(e.message)
        }
    }



}


