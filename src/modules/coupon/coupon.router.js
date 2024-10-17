import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAutheroized } from "../../middleware/autheroization.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import { addCouponVal } from "./coupon.vailedaion.js";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { addCoupon } from "./coupon.controller.js";

const couponRouter = Router();
// add coupone
couponRouter.post(
  "/addCoupon",
  isAuthenticated(),
  isAutheroized([roles.ADMIN]),
  isValid(addCouponVal),
  asyncHandeler(addCoupon)
);
export default couponRouter;
