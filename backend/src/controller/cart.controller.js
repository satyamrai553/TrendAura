import {User} from "../models/user.model.js"
import {Review} from "../models/user.model.js"
import {Cart} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ErrorResponse } from "../utils/ErrorResponse.js"
import { ApiResponse } from "../utils/ApiResponse"
import mongoose from "mongoose"




const addToCart = asyncHandler(async(req, res)=>{
    const userId = await User.findById(req.user?._id)
    if(!userId){
        throw new ErrorResponse(401, "Invalid request, login First")
    }
    const {productId } = req.params
    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new ErrorResponse(400, "Invalid product Id")

    }
    const addedToCart = await Cart.create(
        {
           owner: userId,

        }
    )
})

const deleteProduct = asyncHandler(async(req, res)=>{
    
})
const updateCart = asyncHandler(async(req, res)=>{
    
})
const getUserCart = asyncHandler(async(req, res)=>{
    
})


export { addToCart, deleteProduct, updateCart, getUserCart }