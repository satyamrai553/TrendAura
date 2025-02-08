import {User} from "../models/user.model.js"
import {Product} from "../models/product.model.js"
import {Cart} from "../models/cart.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ErrorResponse } from "../utils/ErrorResponse.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"




const addToCart = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ErrorResponse(401, "Invalid request, login first");
    }

    const { productId } = req.params;
    const { quantity } = req.body; 


    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ErrorResponse(400, "Invalid product ID");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ErrorResponse(404, "Product not found");
    }

    
    let cart = await Cart.findOne({ owner: user._id });

    if (!cart) {
        // Create a new cart if it doesn't exist
        cart = await Cart.create({
            owner: user._id,
            products: [{ product: productId, quantity: quantity || 1 }],
        });
    } else {
        // Check if the product is already in the cart
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (existingProductIndex > -1) {
            // Update quantity if product exists in cart
            cart.products[existingProductIndex].quantity += quantity || 1;
        } else {
            // Add new product to cart
            cart.products.push({ product: productId, quantity: quantity || 1 });
        }

        await cart.save();
    }

    return res.status(200).json(
        new ApiResponse(200, cart, "Product added successfully")
    );
});



const deleteProduct = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ErrorResponse(401, "Invalid request, login first");
    }

    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ErrorResponse(400, "Invalid product ID");
    }

    const cart = await Cart.findOne({ owner: user._id });
    if (!cart) {
        throw new ErrorResponse(404, "Cart not found");
    }

    if(cart.owner != user){
        throw new ErrorResponse(400, "You are not authorized delete product from cart")
    }
    

    // Remove the product from the cart
    cart.products = cart.products.filter(p => p.product.toString() !== productId);

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, "Product removed from cart successfully")
    );
});


const getUserCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ErrorResponse(401, "Invalid request, login first");
    }

    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ owner: user._id }).populate("products.product");

    if (!cart) {
        throw new ErrorResponse(404, "Cart not found");
    }

    return res.status(200).json(
        new ApiResponse(200, cart, "Cart retrieved successfully")
        );
});



const decreaseQuantity = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ErrorResponse(401, "Invalid request, login first");
    }

    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ErrorResponse(400, "Invalid product ID");
    }

    // Find the user's cart
    const cart = await Cart.findOne({ owner: user._id });
    if (!cart) {
        throw new ErrorResponse(404, "Cart not found");
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex === -1) {
        throw new ErrorResponse(404, "Product not found in cart");
    }

    // Decrease quantity or remove the product if quantity reaches 0
    if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
    } else {
        cart.products.splice(productIndex, 1);
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, "Product quantity decreased successfully")
    );
});




const increaseQuantity = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ErrorResponse(401, "Invalid request, login first");
    }

    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ErrorResponse(400, "Invalid product ID");
    }

    // Find the user's cart
    const cart = await Cart.findOne({ owner: user._id });
    if (!cart) {
        throw new ErrorResponse(404, "Cart not found");
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex === -1) {
        throw new ErrorResponse(404, "Product not found in cart");
    }

    // Increase the quantity
    cart.products[productIndex].quantity += 1;

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, "Product quantity increased successfully")
    );
});


const deleteAllProduct = asyncHandler(async (req, res) => {
    // Get the logged-in user
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ErrorResponse(401, "Unauthorized! Please log in.");
    }

    // Find the user's cart
    const cart = await Cart.findOne({ owner: user._id });
    if (!cart) {
        throw new ErrorResponse(404, "Cart not found.");
    }

    // Remove all products from the cart
    cart.products = [];
    await cart.save();

    res.status(200).json({
        success: true,
        message: "All products removed from cart after order placement.",
    });
});




export { addToCart, deleteProduct, getUserCart, decreaseQuantity, increaseQuantity,  deleteAllProduct}