import { appError } from "../utils/appError.js";
import { deleteFile } from "../utils/file-functions.js";
import { deleteCloudeImage } from "../utils/cloud.js";

//asyncHandeler
export const asyncHandeler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return next(new appError(err.message, err.statusCode));
    });
  };
};

//globalErrorHandling
export const globalErrorHandling = async (err, req, res, next) => {
  if (req.file) {
    deleteFile(req.file.path);
  }
  if (req.fileImage) {
    await deleteCloudeImage(req.fileImage.public_id);
  }
  if (req.fileImages?.length > 0) {
    for (const public_id of req.fileImages) {
      await deleteCloudeImage(public_id);
    }
  }
  return res.status(err.statusCode || 500).json({
    message: err.message,
    success: false,
  });
};
