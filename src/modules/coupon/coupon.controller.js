import { Coupon } from "../../../db/index.js";
import { appError } from "../../utils/appError.js";
import { discountTypes } from "../../utils/constant/enums.js";
import { messages } from "../../utils/constant/messages.js";

export const addCoupon = async (req, res, next) => {
  //get data from req
  const { code, discountAmount, discontType, toDate, fromDate } = req.body;
  const userId = req.authUser._id
  // check coupon exist 
  const couponExist = await Coupon.findOne({code})// {} , null
  if (!couponExist) {
    return next (new appError(messages.coupon.alreadyExist , 409))
  }
  // check if percentage 
  if (discontType == discountTypes.PERCENTAGE && discountAmount > 100) {
    return next(new appError("must be less than 100" , 400))
  }
  //prepare data 
  const coupon = new Coupon({
    code , 
    discountAmount,
    discountType,
    toDate,
    fromDate ,
    createdBy : userId
  })
  // add to db
  const  createdCoupon = coupon.save()
  if (!createdCoupon) {
    return next(new appError(messages.coupon.failToCreate, 500))
  }
  //send response 
  return res.status(201).json({
    message : messages.coupon.createdSuccessfully,
    success : true ,
    data : createdCoupon
  })
};
