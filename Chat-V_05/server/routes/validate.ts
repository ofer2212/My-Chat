import * as express from 'express';
import {ValidateController} from "../controllers";

const router = express.Router();


router.post('/', express.json(), ValidateController);
// body => {"name":"name","password":"****"}

export default router;