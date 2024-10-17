import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";
import { roles } from "../../utils/constant/enums.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { addReview } from "./review.controller.js";

const reviewRouter = Router();

reviewRouter.post("/:productId",
     isAuthenticated(),
      isAutheroized([roles.ADMIN, roles.USER]) ,
    asyncHandeler(addReview)
    );
export default reviewRouter;
