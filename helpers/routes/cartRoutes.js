import { Router } from 'express';
import {checkUserId} from "../helpers.js";
import {createOrSetCart, deleteProd, getOrder} from "../../shop/services.js";

const cartRouter = Router();

cartRouter.all(checkUserId)

cartRouter.put('/:id', createOrSetCart);

cartRouter.delete('/:id', deleteProd)

cartRouter.post('/checkout', getOrder)

export default cartRouter