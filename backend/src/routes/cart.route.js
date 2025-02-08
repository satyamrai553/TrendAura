import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addToCart,
    deleteProduct,
    getUserCart,
    decreaseQuantity,
    increaseQuantity,
    deleteAllProduct
} from "../controller/cart.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getUserCart).delete(deleteAllProduct);
router.route("/:productId")
    .post(addToCart)
    .delete(deleteProduct)
    .patch(decreaseQuantity);

router.patch("/:productId/increase", increaseQuantity);
router.patch("/:productId/decrease", decreaseQuantity);

export default router;
