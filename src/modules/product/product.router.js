import { Router } from "express";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { isValid } from "../../middleware/validation.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { addProduct, getAllProducts } from "./product.controller.js";
import { addProductVal } from "./product.validation.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";
import { roles } from "../../utils/constant/enums.js";

const productRouter = Router();
// add product  
productRouter.post(
  "/add",
  isAuthenticated(),
  isAutheroized([roles.ADMIN , roles.SELLER]),
  cloudUpload({}).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 6 },
]),
isValid(addProductVal),
asyncHandeler(addProduct)
);
productRouter.get('/' ,asyncHandeler(getAllProducts ))
export default productRouter;
