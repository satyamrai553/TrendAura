import Address from "../models/address.model"
import { asyncHandler } from "../utils/asyncHandler"
import {ErrorResponse} from "../utils/ErrorResponse"
import {ApiResponse} from "../utils/ApiResponse"
import { User } from "../models/user.model"
import mongoose from "mongoose"

const createAddress = asyncHandler(async (req,res)=>{
    const {addressLine1, addressLine2, pincode, city, state, country}  = req.body
    addressLine2 = addressLine2?.trim()
    if([addressLine1, pincode, city, state, country].some((field)=>field?.trim() ==="")){
        throw new ErrorResponse(400, "All fields are required")
    }

    const user = await User.findById(req.user?._id)
    if(!user){
        throw new ErrorResponse(401, "User Id is invalid")
    }
    const address = await Address.create({
        addressLine1,
        addressLine2,
        pincode,
        city,
        state,
        country,
        owner: user._id
    })
    if(!address){
        throw new ErrorResponse(500, "Fail to create address")
    }
    return res.status(200).json(
        new ApiResponse(200, address, "Address created successfully")
    )

})

const getAllAddress = asyncHandler(async (req,res)=>{
    const { page = 1, limit = 10 } = req.query;
    const addressAggregation = Address.aggregate([
        {
          $match: {
            owner: req.user._id,
          },
        },
      ]);
    
      const addresses = await Address.aggregatePaginate(
        addressAggregation,
        getMongoosePaginationOptions({
          page,
          limit,
          customLabels: {
            totalDocs: "totalAddresses",
            docs: "addresses",
          },
        })
      );

    return res.status(200).json(
        new ApiResponse(200, addresses, "Address fetched successfully")
    )
})

const getAddressById = asyncHandler(async(req, res)=>{
    const {addressId} = req.params
    if(!mongoose.Types.ObjectId.isValid(addressId)){
        throw new ErrorResponse(400, "Invalid address Id")
    }
    const address = await Address.findById({
        _id: addressId,
        owner: req.user._id
    })

    if(!address){
        throw new ErrorResponse(404, "Address not found")
    }

    return res.status(200).json(
        new ApiResponse(200, address, "Address fetched successfully")
    )
})


const updateAddress = asyncHandler(async (req, res)=>{
    

    return res.status(200).json(
        new ApiResponse(200, updatedAddress, "Address updated successfully")
    )
})





export {
    createAddress,
    getAllAddress,
    getAddressById,
    updateAddress,
    deleteAddress

}