import {Category} from '../models/category.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ErrorResponse } from '../utils/ErrorResponse.js'
import { User } from '../models/user.model.js'

const getCategories = asyncHandler(async(req,res)=>{
    const categories = await Category.find();
    if(!categories && categories.length !== 0){
        throw new ErrorResponse(404, "No Category Found")
    }
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    )
})
const addCategory = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new ErrorResponse(400, "Unathorized access")
    }
    if(user.role !== "admin"){
        throw new ErrorResponse(400, "User is not admin Unathorized request!")
    }
    const {name} = req.body
    if(!name){
        throw new ErrorResponse(400, "Please enter category name!")
    }
    const creatCategory = await Category.create(
        {
            name: name
        }
    )
    if(!creatCategory){
        throw new ErrorResponse(500, "Error while creating category!")
    }
    return res.status(200).json(
        new ApiResponse(200, creatCategory, "Category created successfully!")
    )

})
const deleteCategory = asyncHandler((req,res)=>{

})
const updateCategory = asyncHandler((req,res)=>{

})


export {
    addCategory,
    deleteCategory,
    updateCategory,
    getCategories,
}