import {Document, Schema, Model, model} from "mongoose";
import {Group} from "./group";
import {User} from "./user";
import {IMessage} from "../../sharedInterfaces";





export interface IMessageModel extends IMessage, Document {
    setStatus(changeTo: string): Promise<any>;

    sendMessage(msg: IMessage): Promise<any>;
}

export var MessageSchema: Schema = new Schema({
        from: {type: Schema.Types.ObjectId, ref: 'User'},
        toUser: {type: Schema.Types.ObjectId, ref: 'User'},
        toGroup: {type: Schema.Types.ObjectId, ref: 'Group'},
        createdOn: {type: String, default: Date.now().toLocaleString()},
        content: String,
        status: String
    })
;

MessageSchema.methods.setStatus = async function (changeTo: string) {
    await this.constructor.update({_id: this._id}, {
        status: changeTo
    }, {new: true}).exec();
};


export const Message: Model<IMessageModel> = model<IMessageModel>("Message", MessageSchema);

