import express from 'express';
import crypto from 'crypto';
import {createOrSetCart, deleteProd, getAllProducts, getOrder, getProdById, registrationUser} from "./shop/services.js";
import {checkUserId} from "./helpers/helpers.js";

const PORT = 3000;

const app = express();
app.use(express.json());

app.post('/api/register', await registrationUser)

app.get('/api/products', checkUserId, getAllProducts)

app.get('/api/products/:id', checkUserId, getProdById)

app.put('/api/cart/:id', checkUserId, createOrSetCart)

app.delete('/api/cart/:id', checkUserId, deleteProd)

app.post('/api/cart/checkout', checkUserId, getOrder)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});