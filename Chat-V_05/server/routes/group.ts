import * as express from 'express';
import {GroupController} from "../controllers";

const router = express.Router();

router.get('/', GroupController.getGroups);

router.put('/new_group', express.json(), GroupController.newGroup);
// body => {"name":"group name","public":"public","admin":"user id","parent":"if nested"}


router.delete('/delete/:groupId', GroupController.deleteGroup);
// :params => group Id


export default router;
