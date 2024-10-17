import { Router } from "express";
// import { fileUpoad } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.js";
import { addCategoryVal, updateCategoryVal } from "./category.validation.js";
import { addCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";
import { roles } from "../../utils/constant/enums.js";
const categoryRouter = Router();
//add category
categoryRouter.post(
  "/addCategory",
  isAuthenticated(),
  isAutheroized([roles.ADMIN , roles.SELLER]),
  cloudUpload({}).single("image"),
  isValid(addCategoryVal),
  asyncHandeler(addCategory)
); // 

//update category
categoryRouter.put(
  "/updeate/:categoryId",
  
  isAuthenticated(),
  isAutheroized([roles.ADMIN , roles.SELLER]),
  cloudUpload({}).single("image"),
  isValid(updateCategoryVal),
  asyncHandeler(updateCategory)
); 

//get all category
categoryRouter.get('/',asyncHandeler(getCategory))
//delete category
categoryRouter.delete('/delete/:categoryId' , asyncHandeler(deleteCategory))
export default categoryRouter;
