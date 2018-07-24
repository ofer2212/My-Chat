import {Request, Response} from "express";
import {GroupService} from "../services";

export class GroupController {

    public static async newGroup(req: Request, res: Response) {
        try {
            const data = req.body;
            await GroupService.newGroup(data);
            res.json("done")
        } catch (e) {
            res.json(e.message)
        }
    }

    public static async deleteGroup(req: Request, res: Response) {
        try {
            const groupId = req.params.groupId;
            await GroupService.deleteGroup(groupId);
            res.json("done")
        } catch (e) {
            res.json(e.message)
        }
    }

    public static async getGroups(req: Request, res: Response) {
        try {
            const serviceResult = await GroupService.getGroups();
            res.json(serviceResult)
        } catch (e) {
            res.json(e.message)
        }
    }

}