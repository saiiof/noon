import { Router } from "express";

import { roles } from "../../utils/constant/enums.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { createOrder } from "./order.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";

const   orderRouter = Router();
// create order
orderRouter.post(
  "/",
  isAuthenticated(),
  isAutheroized([roles.USER, roles.ADMIN]),
  asyncHandeler(createOrder)
);
export default orderRouter;