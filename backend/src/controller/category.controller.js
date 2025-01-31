import {Category} from '../models/category.model'
import { asyncHandler } from '../utils/asyncHandler'
import { ApiResponse } from '../utils/ApiResponse'
import { ErrorResponse } from '../utils/ErrorResponse'
import { User } from '../models/user.model'


const addCategory = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new ErrorResponse(400, "Unathorized access")
    }
    if(user.role !== admin){
        throw new ErrorResponse(400, "User is not admin Unathorized request!")
    }
    const {category} = req.body
    if(!category){
        throw new ErrorResponse(400, "Please enter category name!")
    }
    const creatCategory = await Category.create(
        {
            name: category
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
    updateCategory
}