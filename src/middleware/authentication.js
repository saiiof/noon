import { User } from "../../db/index.js";
import { appError } from "../utils/appError.js";
import { status } from "../utils/constant/enums.js";
import { messages } from "../utils/constant/messages.js";
import { verifyToken } from "../utils/token.js";

export const isAuthenticated = () => {
  return async (req, res, next) => {
    //token
    const { token } = req.headers;
    //decoded token
    const payload = verifyToken({ token });
    if (payload.message) {
      return next(new appError(payload.message, 401));
    }
    //check user exist
    const authUSer = await User.findOne({
      _id: payload._id,
      status: status.VERIFIED,
    });
    if (!authUSer) {
      return next(new appError(messages.user.notFound, 404));
    }
    req.authUSer = authUSer;
    next();
  };
};
