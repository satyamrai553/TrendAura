import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT)


router.route("/category").post(addCategory).delete(deleteCategory).patch(updateCategory)



export default router;

