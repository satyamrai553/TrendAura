import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct, getProductByCategory} from "../controller/product.controller.js"


const router = Router()


router.route("/").get(getAllProduct)
router.route("/:productId").get(getProduct)
router.route("/:categoryId").get(getProductByCategory)


//protected routes
router.route("/addProduct").post(verifyJWT, addProduct)
router.route("/:productId").delete(verifyJWT, deleteProduct).patch(verifyJWT, updateProduct);

export default router