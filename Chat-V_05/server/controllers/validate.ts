import {ValidateService} from "../services";
import {Request, Response} from "express";

export async function ValidateController(req: Request, res: Response) {
    try {
        const userAuth = req.body;
        const serviceResult = await ValidateService(userAuth);
        res.json(serviceResult)
    } catch (e) {
        res.json(e.message)
    }
}
