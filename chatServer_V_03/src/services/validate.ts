import {IUserAuth} from "../sharedInterfaces";
import {User} from "../mongodb/models/user";


export async function ValidateService(user: IUserAuth) {
    try {
        console.log("validating...")
        if (!user) {
            throw new Error("user data is not valid")
        }
        else {
            const userToCheck = await User.findOne({name: user.name});
            if (userToCheck) {
                if (!userToCheck.validateUser(user.password)) {
                    throw new Error("invalid password")
                }
                else {
                   await userToCheck.update({online: true}).exec();
                  await userToCheck.populate('messages').execPopulate();
                    return userToCheck
                }

            }
            else {
                throw new Error("user not found")
            }
        }
    }
    catch (e) {
        throw new Error(e.message)
    }
}