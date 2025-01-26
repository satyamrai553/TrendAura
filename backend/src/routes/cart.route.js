import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { addToCart, deleteProduct, updateCart, getUserCart } from '../controller/cart.controller.js';
const router = Router();

router.use(verifyJWT)


router.route("/:productId").post(addToCart).delete(deleteProduct).patch(updateCart)
router.route("/:userId").get(getUserCart)


export default router;






