// import moduls
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import multer, { diskStorage } from "multer";

export const fileValidation = {
  image: ["image/jpeg", "image/png"],
  file : ['application/pdf', 'application/msword'],
  video : ['video/mp4']
};
export const fileUpoad = ({ folder, allowFile = fileValidation.image }) => {
  const storage = diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.resolve(`uploads/${folder}`);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
      cb(null, nanoid() + "-" + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (allowFile.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error("invalid file format"), false);
  };
  return multer({ storage, fileFilter });
};
