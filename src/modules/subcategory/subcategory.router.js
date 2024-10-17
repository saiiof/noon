import { Router } from "express";
import { fileUpoad } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.js";
import { addSubcategoryVal } from "./subcategory.validation.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { addSubcategory, getSubcategory } from "./subcategory.controller.js";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";
import { roles } from "../../utils/constant/enums.js";

const subcategoryRouter = Router();
// add subcategory
subcategoryRouter.post(
  "/addsubcategory",
  isAuthenticated(),
  isAutheroized([roles.ADMIN ]),
  cloudUpload({ }).single("image"),
  isValid(addSubcategoryVal),
  asyncHandeler(addSubcategory)
);

//get subcategory
subcategoryRouter.get("/:categoryId", asyncHandeler(getSubcategory));
export default subcategoryRouter;
