import User from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ErrorResponse } from '../utils/ErrorResponse.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'



const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}


    } catch (error) {
        throw new ErrorResponse(500, "Something went wrong while generating refresh and access token")
    }
}



const registerUser = asyncHandler(async(req,res)=>{
    const {email, phoneNumber, fullname, password, role}=req.body
    if([fullname, email, password, role, phoneNumber].some((field)=> field?.trim() === "" )){
        throw new ErrorResponse(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{email}, {phoneNumber}]
    })

    if(existedUser){
        throw new ErrorResponse(409, "User with same email or phone number already exists!")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        phoneNumber,
        role
    })

    const createdUser = await User.findbyId(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ErrorResponse(501, "Somthing went wrong while registring a user")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200, createdUser, "User register successful")
    )


})



const loginUser = asyncHandler(async(req, res)=>{
    const {email, phoneNumber, password} = req.body;
    if(!email && !phoneNumber ){
        throw new ErrorResponse(400, "Email or phone number is required")
    }
    if(!password){
        throw new ErrorResponse(400, "Password is required")
    }
    const user = findOne({
        $or: [{phoneNumber}, {email}]
    })

    if(!user){
        throw new ApiErrorResponse(404, "No user found with the provided email or Phone Number");

    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ErrorResponse(400, "Invalid password")
    }


    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "User logged In Successfully")
    )

})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined,
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async(req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken){
        throw new ErrorResponse(401,"Unathorized request");
    }


    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
       const user = await User.findById(decodedToken?._id)
    
       if(!user){
        throw new ErrorResponse(401, "Invalid refresh token");
       }
    
       if(incomingRefreshToken !== user?.refreshToken){
        throw new ErrorResponse(401, "Refresh token is expired or used")
       }
    
       const options ={
        httpOnly: true,
        secure: true
       }
      const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
       return res
       .status(200)
       .cookie('accessToken', accessToken,options)
       .cookie("refreshToken", newRefreshToken, options)
       .json(
        new ApiResponse(
            200,
            {accessToken, newRefreshToken},
            "Access token refreshed successfully"
        )
       )
    } catch (error) {
      throw new ErrorResponse(401, error?.messge || "Invalid refresh token")
    }
})


const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body;

    const user = await user.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ErrorResponse(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})


    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully!"))

})


const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullname, email} = req.body

    if(!fullname && !email){
        throw new ErrorResponse(400, "fullname or email is required")
    }

    User.findByIdAndUpdate(req.user?._id,
        {
    
            $set:{
                fullname: fullname,
                email: email
            }
       

    },
    {
        new: true
    }
).select("-password")

return res.status(200).json(
    new ApiResponse(200, "User account details updated successfully")
)

})



const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path
   if(!avatarLocalPath){
    throw new ErrorResponse(400, "Avatar file is missing")
   }
   const avatar = await uploadOnCloudinary(avatarLocalPath)

   if(!avatar.url){
    throw new ErrorResponse(400, "Error while uploading on avatar")
   }

  const user = await User.findByIdAndUpdate(req.user._id,
    {
        $set: {
            avatar: avatar.url
        }
    },
    {
        new: true
    }

  ).select("-password")
  return res.status(200)
  .json(
   new ApiResponse(200, user, "Avatar image updated successfully")
  )
})







export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}
