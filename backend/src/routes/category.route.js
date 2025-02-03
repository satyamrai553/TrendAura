import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { addCategory, deleteCategory, updateCategory, getCategories } from '../controller/category.controller.js';

const router = Router();

router.route("/").get(getCategories)



//Protected routes
router.route("/")
.post(verifyJWT, addCategory)
.delete(verifyJWT, deleteCategory)
.patch(verifyJWT, updateCategory)




export default router;

