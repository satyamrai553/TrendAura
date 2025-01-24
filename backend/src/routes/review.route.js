import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"



const router = Router()

router.use(verifyJWT); 

router.route("/:productId").get(getProductReviews).post(addReview);
router.route("/:reviewId").delete(deleteReview).patch(updateReview);

export default router