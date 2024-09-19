import express from 'express';
import prodRouter from "./helpers/routes/prodRoutes.js";
import cartRouter from "./helpers/routes/cartRoutes.js";
import {registrationUser} from "./shop/services.js";

const PORT = 3000;

const app = express();
app.use(express.json());

app.post('/api/register', registrationUser)

app.use('/api/products', prodRouter);

app.use('/api/cart', cartRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});