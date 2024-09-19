import { Router } from 'express';
import {checkUserId} from "../helpers.js";
import {getAllProducts, getProdById} from "../../shop/services.js";

const prodRouter = Router();

prodRouter.get('/', checkUserId, getAllProducts);

prodRouter.get('/:id', checkUserId, getProdById)

export default prodRouter