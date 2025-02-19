import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct, getProductByCategory, getProductsByTag, getProductsByFilter} from "../controller/product.controller.js"
import {upload} from '../middlewares/multer.middleware.js'

const router = Router()


router.route("/tag").get(getProductsByTag);
router.route("/category/:categoryId").get(getProductByCategory)
router.route("/:productId").get(getProduct)
router.route("/").get(getAllProduct)
router.route("/filter").get(getProductsByFilter);


//protected routes
router.route("/addProduct").post(verifyJWT, upload.single("productImage"), addProduct)
router.route("/:productId").delete(verifyJWT, deleteProduct).patch(verifyJWT, updateProduct);

export default router