import { Router } from "express";
import { roles } from "../../utils/constant/enums.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { addToCart } from "./cart.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";

const cartRouter = Router();
// add to cart
cartRouter.put(
  "/",
  isAuthenticated(),
  isAutheroized([roles.USER, roles.ADMIN]),
  asyncHandeler(addToCart)
);
export default cartRouter;