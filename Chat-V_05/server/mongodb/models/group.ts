import {Document, Schema, Model, model} from "mongoose";
import {User} from "./user";
import * as mongoose from 'mongoose'
import {IGroup} from "../../sharedInterfaces";


export interface IGroupModel extends IGroup, Document {
    fullName(): string;

    addUser(user: any): Promise<any>;

    addSubGroup(group: any): Promise<any>;

    receiveMessage(msg: any): Promise<any>;

    removeUser(user: any): Promise<any>;
}

export var GroupSchema: Schema = new Schema({
        name: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
        },
        public: String,
        admin: {type: Schema.Types.ObjectId, ref: 'User'},
        groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
        users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
        type: {type: String, default: "group"},
        parent:{type: Schema.Types.ObjectId, ref: 'Group'},
    })
;

GroupSchema.methods.getUsers = function () {
    return this.users;
};
GroupSchema.methods.addSubGroup = async function (group) {
    try {

        await   this.constructor.update({_id: this._id}, {
            "$push": {"groups": group}
        }, {new: true}).exec();

    }
    catch (e) {
        throw new Error(e.message)

    }
};

GroupSchema.methods.receiveMessage = async function (msg) {
    const group = await Group.findById(this._id)
        .populate('users').exec();
    await group.users.forEach(async (user) => {
        await user.receiveMessage(msg)
    });
    await this.constructor.update({_id: this._id}, {
        "$push": {"messages": msg}
    }, {new: true}).exec();
};

GroupSchema.methods.removeSubGroup = async function (group) {
    await this.constructor.update({_id: this._id}, {
        "$pull": {"groups": group._id}
    }, {new: true}).exec();
};

GroupSchema.methods.addUser = async function (user) {
    try {
        const group = await Group.findById(this._id)
            .populate('users', "username").exec();
        const indexIndicator = group.users
            .findIndex(currentUser => currentUser.name === user.name);
        if (indexIndicator !== -1) {
            throw new Error("user already exist in this group")
        }
        else {
            await this.constructor.update({_id: this._id}, {
                "$push": {"users": user}
            }, {new: true}).exec();
        }
    }
    catch (e) {
        throw new Error(e.message)

    }

};
GroupSchema.methods.removeUser = async function (user) {
    await this.constructor.update({_id: this._id}, {
        "$pull": {"users": user._id}
    }, {new: true}).exec();
};

GroupSchema.methods.setAdmin = async function (userId) {
    await this.constructor.update({_id: this._id}, {
        admin: userId
    }, {new: true}).exec();
};

GroupSchema.methods.getMessages = function () {
    return this.messages;
};

export const Group: Model<IGroupModel> = model<IGroupModel>("Group", GroupSchema);

// User.on('error', (e)=>{console.log("error from user model - ",e)});

// GroupSchema.path("name").validate({
//     validator: async function (value) {
//         const allUsers = await User.find({name:value});
//         return allUsers.length <= 0;
//     }, message: 'already exist'
// });