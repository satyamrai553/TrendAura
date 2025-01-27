import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

router.use(verifyJWT)


router.route("/:productId").post(addToCart).delete(deleteProduct).patch(updateCart)
router.route("/:userId").get(getUserCart)


export default router;






