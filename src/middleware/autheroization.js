import { appError } from "../utils/appError.js";
import { messages } from "../utils/constant/messages.js";

export const isAutheroized = (roles) => {
  return (req, res, next) => {
    //req >>> authUser
    if (!roles.includes(req.authUSer.role)) {
      return next(new appError(messages.user.notAuthorized, 401));
    }
    next()
  };
};
