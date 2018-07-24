import * as express from 'express';
import {MessageController} from "../controllers";

const router = express.Router();

router.put('/send', express.json(), MessageController.sendMessage);
// body => {"fromId":"###","toId":"###","content":"bla bla bla"}

export default router;
