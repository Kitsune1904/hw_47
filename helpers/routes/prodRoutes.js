import { Router } from 'express';
import {checkUserId} from "../helpers.js";
import {getAllProducts, getProdById} from "../../shop/services.js";

const prodRouter = Router();

prodRouter.all(checkUserId)

prodRouter.get('/', getAllProducts);

prodRouter.get('/:id', getProdById)

export default prodRouter