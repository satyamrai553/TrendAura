import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { changeCurrentPassword, getOrderHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, getCurrentUser } from "../controller/user.controller.js";


const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/orderHistory").get(verifyJWT, getOrderHistory)


export default router;