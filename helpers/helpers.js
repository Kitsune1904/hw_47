import {products} from "../storage.js";

export const checkEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    if (email.length > 254) {
        return false
    } else {
        return pattern.test(email)
    }
};

export const checkPass = (pass) => {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[?!@#$%^&*])[A-Za-z\d?!@#$%^&*]{8,}$/;
    return pattern.test(pass);
}

export const checkUserId = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).send('Unauthorized');
    }
    req.userId = userId;
    next();
}

export const getProduct = (req, res) => {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
        res.status(400).send('Wrong id format');
        return;
    }
    const product = products.find(prod => prod.id === productId);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    return product
}