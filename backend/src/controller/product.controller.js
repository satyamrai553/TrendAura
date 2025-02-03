import { User } from '../models/user.model.js';
import { Product } from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/ErrorResponse';
import { ApiResponse } from '../utils/ApiResponse';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/uploadOnCloudinary.js';

// Add Product
const addProduct = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user || user.role !== 'seller') {
        throw new ErrorResponse(403, "You are not authorized to add a product");
    }
    
    const { name, description, quantity, price, category, tags } = req.body;

    if (!name || !description || !quantity || !price || !category) {
        throw new ErrorResponse(400, "All fields are required");
    }  

    if (!req.file) {
        throw new ErrorResponse(400, "Product image is required");
    }    

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse || !cloudinaryResponse.url) {
        throw new ErrorResponse(500, "Failed to upload product image");
    }

    const product = new Product({
        name,
        description,
        image: cloudinaryResponse.url, 
        quantity,
        price,
        category,
        seller: req.user._id,
        tags: tags ? tags.split(',') : [], 
    });  

    const savedProduct = await product.save(); 
    if (!savedProduct) {
        throw new ErrorResponse(500, "Failed to save product");
    }

    return res.status(201).json(
        new ApiResponse(201, savedProduct, "Product added successfully!")
    );
});

// Get All Products
const getAllProduct = asyncHandler(async (req, res) => {
    const limitValue = parseInt(req.query.limit) || 10;
    const skipValue = parseInt(req.query.skip) || 0;

    if (isNaN(limitValue) || isNaN(skipValue) || limitValue < 0 || skipValue < 0) {
        throw new ErrorResponse(400, "Invalid limit or skip value");
    }

    const allProduct = await Product.find()
        .limit(limitValue)
        .skip(skipValue);

    if (!allProduct) {
        throw new ErrorResponse(500, "Something went wrong while fetching products!");
    }

    return res.status(200).json(
        new ApiResponse(200, allProduct, "Products fetched successfully!")
    );
});

// Get Product by ID
const getProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ErrorResponse(400, "Invalid product ID");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ErrorResponse(404, "Product not found");
    }

    return res.status(200).json(
        new ApiResponse(200, product, "Product fetched successfully!")
    );
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user || user.role !== 'seller') {
        throw new ErrorResponse(403, "You are not authorized to update a product");
    }

    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ErrorResponse(400, "Invalid product ID");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ErrorResponse(404, "Product not found");
    }

    if (product.seller.toString() !== req.user._id.toString()) {
        throw new ErrorResponse(403, "You are not authorized to update this product");
    }

    const { name, description, quantity, price, category, tags } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (quantity) product.quantity = quantity;
    if (price) product.price = price;
    if (category) product.category = category;
    if (tags) product.tags = tags.split(',');

    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse || !cloudinaryResponse.url) {
            throw new ErrorResponse(500, "Failed to upload product image");
        }
        product.image = cloudinaryResponse.url;
    }

    const updatedProduct = await product.save();
    if (!updatedProduct) {
        throw new ErrorResponse(500, "Updating product detail failed");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product updated successfully!")
    );
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user || user.role !== 'seller') {
        throw new ErrorResponse(403, "You are not authorized to delete a product");
    }

    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ErrorResponse(400, "Invalid product ID");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ErrorResponse(404, "Product not found");
    }

    if (product.seller.toString() !== req.user._id.toString()) {
        throw new ErrorResponse(403, "You are not authorized to delete this product");
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new ErrorResponse(500, "Failed to delete product");
    }

    return res.status(200).json(
        new ApiResponse(200, deletedProduct, "Product deleted successfully!")
    );
});

// Get Products by Category
const getProductByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new ErrorResponse(400, "Invalid category ID");
    }

    const products = await Product.find({ category: categoryId });

    if (products.length === 0) {
        throw new ErrorResponse(404, "No products found for this category");
    }

    return res.status(200).json(
        new ApiResponse(200, products, "Products fetched successfully!")
    );
});

// Get Products by Tag
const getProductsByTag = asyncHandler(async (req, res) => {
    const { tag } = req.query;

    if (!tag) {
        throw new ErrorResponse(400, "Tag parameter is required");
    }

    const tagArray = tag.split(',').map(t => t.trim()); // Support multiple tags

    const products = await Product.find({ tags: { $in: tagArray } });

    if (products.length === 0) {
        throw new ErrorResponse(404, "No products found for the given tag(s)");
    }

    return res.status(200).json(
        new ApiResponse(200, products, "Products filtered by tag successfully!")
    );
});

export { 
    addProduct, 
    getAllProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct, 
    getProductByCategory,
    getProductsByTag
};
