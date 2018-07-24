import {Document, Schema, Model, model} from "mongoose";
import {IUser} from "../../sharedInterfaces";




export interface IUserModel extends IUser, Document {
    receiveMessage(msg: any): Promise<any>;

    validateUser(password: string): boolean;

    changeAge(newAge: any): Promise<any>;
}

export var UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    gender: String,
    age: String,
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    online: {type: Boolean, default: false},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    type: {type: String, default: "user"}

});

UserSchema.methods.receiveMessage = async function (msg) {
    await this.constructor.update({_id: this._id}, {
        "$push": {"messages": msg}
    }, {new: true}).exec();
};

UserSchema.methods.validateUser = function (password: string) {
    return this.password === password
};

UserSchema.methods.changeAge = async function (newAge) {
    await this.constructor.update({_id: this._id}, {
        age: newAge
    }, {new: true}).exec();
};

UserSchema.path("username").validate({
    validator: async function (value) {
        const allUsers = await User.find({name: value});
        return allUsers.length <= 0;
    }, message: 'already exist'
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

User.on('error', (e) => {
    console.log("error from user model - ", e)
});


