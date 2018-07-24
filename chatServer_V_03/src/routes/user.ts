import * as express from 'express';
import {UserController} from "../controllers";

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:userId', express.json(), UserController.getUser);
// :params => userId:"user id"

router.delete('/leave', express.json(), UserController.leave);
// body => {"userId":"user id","groupId":"group id"}

router.delete('/:userId', UserController.deleteUser);
// :params => userId:"user id"

router.put('/join', express.json(), UserController.join);
// body => {"userId":"user id","groupId":"group id"}

router.put('/newuser', express.json(), UserController.newUser);
// body => {"name":"name","gender":"gender","password":"password","age":age }



export default router;