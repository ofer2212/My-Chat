import {Request, Response} from "express";
import {UserService} from "../services";


export class UserController {

    public static async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            await UserService.deleteUser(userId);
            res.json("deleted")
        } catch (e) {
            res.json(e.message)
        }
    }

    public static async newUser(req: Request, res: Response) {
        try {
            const user = req.body;
            await UserService.newUser({
                name: user.name,
                password: user.password,
                age: user.age,
                gender: user.gender
            });
            // const tree = await TreeService.getTree();
            res.json("user created")
        } catch (e) {
            res.json(e.message)
        }
    }


    public static async join(req: Request, res: Response) {
        try {

            const data = req.body;
            await UserService.joinGroup(data.userId, data.groupId);
            res.json("done")
        } catch (e) {
            res.json(e.message)
        }
    }


    public static async leave(req: Request, res: Response) {
        try {
            const data = req.body;
            await UserService.leaveGroup(data.userId, data.groupId);
            res.json("done")
        } catch (e) {
            res.json(e.message)
        }
    }

    public static async getUsers(req: Request, res: Response) {
        try {
            const serviceResult = await UserService.getUsers();
            res.json(serviceResult)
        } catch (e) {
            res.json(e.message)
        }
    }

    public static async getUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            if (!userId) {
                throw new Error("cant read request")
            }
            const serviceResult = await UserService.getUser(userId);
            res.json(serviceResult)
        } catch (e) {
            res.json(e.message)
        }
    }


}