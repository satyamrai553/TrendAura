import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { addToCart, deleteProduct, getUserCart, decreaseQuantity, increaseQuantity,  deleteAllProduct } from '../controller/cart.controller.js';
const router = Router();

router.use(verifyJWT)


router.route("/:productId").post(addToCart).delete(deleteProduct).patch(decreaseQuantity).path(increaseQuantity)
router.route("/").get(getUserCart).patch(deleteAllProduct)


export default router;






