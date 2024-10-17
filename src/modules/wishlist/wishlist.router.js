import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";
import { roles } from "../../utils/constant/enums.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { addToWishlist } from "./wishlist.controller.js";

const wishlistRouter = Router();
//add to wishlist
wishlistRouter.post(
  "/:productId",
  isAuthenticated(),
  isAutheroized([roles.USER, roles.ADMIN]),
  asyncHandeler(addToWishlist)
);
export default wishlistRouter;
