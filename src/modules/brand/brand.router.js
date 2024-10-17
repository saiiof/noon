import { Router } from "express";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addBrandVal, updateBrandVal } from "./brand.validation.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { addBrand, updateBrand } from "./brand.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";
import { roles } from "../../utils/constant/enums.js";

const brandRouter = Router();
// add brand
brandRouter.post(
  "/addBrand",
  isAuthenticated(),
  isAutheroized([roles.ADMIN, roles.SELLER]),
  cloudUpload({}).single("logo"),
  isValid(addBrandVal),
  asyncHandeler(addBrand)
);
// update brand
brandRouter.put(
  "/updateBrand/:brandId",
  isAuthenticated(),
  isAutheroized([roles.ADMIN, roles.SELLER]),
  cloudUpload({}).single("logo"),
  isValid(updateBrandVal),
  asyncHandeler(updateBrand)
);
export default brandRouter;
