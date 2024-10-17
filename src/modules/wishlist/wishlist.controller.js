import { User } from "../../../db/index.js";

export const addToWishlist = async (req, res, next) => {
  //get data from req
  const { productId } = req.params;
  const userId = req.authUser._id;
  // add to db
  const userUpdated = await User.findByIdAndUpdate(userId, {
    $addToSet: { wishlist: productId },
  }, {new : true});
  return res
    .status(200)
    .json({
      message: "wishlist updated successfully",
      success: true,
      data: userUpdated.wishlist,
    });
};
