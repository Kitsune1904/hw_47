import {checkEmail, checkPass, getProduct} from "../helpers/helpers.js";
import {carts, orders, products, users} from "../storage.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const registrationUser = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userName = req.body.name;
        const userPass = req.body.password;

        const isEmailValid = checkEmail(userEmail);
        const isPassValid = checkPass(userPass);

        const isUserExist = users.some(user => user.email === userEmail)

        if (!userEmail || !userName || !userPass) {
            res.status(400).send('Missing required fields');
            return;
        }
        if (isUserExist) {
            res.status(409).send('User exist');
            return;
        }
        if (!isEmailValid || !isPassValid) {
            res.status(422).send(`Invalid ${isEmailValid ? '' : 'email'} ${isPassValid ? '' : 'password'}`);
            return;
        }
        const newUser = {
            id: crypto.randomUUID(),
            email: userEmail,
            name: userName,
        }
        const hashedPassword = await bcrypt.hash(userPass, 10);
        users.push({
            ...newUser,
            password: hashedPassword
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error registration:', error);
        res.status(500).send('Internal server error');
    }
}

export const getAllProducts = (req, res) => {
    try {
        res.status(200).json(products)
    } catch (error) {
        console.error('Error getting product\'s list:', error);
        res.status(500).send('Internal server error');
    }
}

export const getProdById = (req, res) => {
    try {
        res.status(200).json(getProduct(req, res))
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).send('Internal server error');
    }
}

export const createOrSetCart = (req, res) => {
    try {
        const product = getProduct(req, res)
        const userId = req.userId;
        let userCart = carts.find(cart => cart.userId === userId);
        if (!userCart) {
            userCart = {
                id: crypto.randomUUID(),
                userId: userId,
                products: []
            }
            carts.push(userCart);
        }
        userCart.products.push(product);
        res.status(201).json(userCart);
    } catch (error){
        console.error('Error adding products in cart:', error);
        res.status(500).send('Internal server error');
    }
}

export const deleteProd = (req, res) => {
    try {
        const prodId = Number(req.params.id);
        const userId = req.userId;
        let userCart = carts.find(cart => cart.userId === userId);
        if (!userCart) {
            res.status(404).send('Cart not found');
            return;
        }
        const prodIndex = userCart.products.findIndex(product => product.id === prodId);
        if (prodIndex === -1) {
            return res.status(404).send('Product not found in cart');
        }
        userCart.products.splice(prodIndex, 1);
        res.status(200).json(userCart);
    } catch (error) {
        console.error('Error adding products in cart:', error);
        res.status(500).send('Internal server error');
    }
}

export const getOrder = (req, res) => {
    try {
        const userId = req.userId;
        const userCart = carts.find(cart => cart.userId === userId);
        if (!userCart) {
            res.status(404).send('Cart not found');
            return;
        }
        const userOrder = {
            id: crypto.randomUUID(),
            userId: userId,
            products: userCart.products,
            totalPrice: userCart.products.reduce((acc, prod) => acc + prod.price, 0)
        }
        orders.push(userOrder);
        res.status(201).json(userOrder)
    } catch (error) {
        console.error('Error adding products in cart:', error);
        res.status(500).send('Internal server error');
    }
}
