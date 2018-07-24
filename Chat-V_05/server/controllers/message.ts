import {Request, Response} from "express";
import {MessageService} from "../services";

export class MessageController {


    public static async sendMessage(req: Request, res: Response) {
        try {
            const msgData = req.body;
            const generatedMessage = await MessageService.sendMessage(msgData.fromId, msgData.toId, msgData.content);
            //  const updatedMessages = await MessageService.getMessages(msgData.fromId,msgData.toId);
            res.json(generatedMessage)
        } catch (e) {
            res.json(e.message)
        }
    }


}