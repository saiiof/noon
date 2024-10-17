import slugify from "slugify";
import { Brand } from "../../../db/index.js";
import { appError } from "../../utils/appError.js";
import { messages } from "../../utils/constant/messages.js";
import cloudinary from "../../utils/cloud.js";

export const addBrand = async (req, res, next) => {
  //get data from req
  let { name } = req.body;
  name = name.toLowerCase();
  // check existence
  const brandExist = await Brand.findOne({ name });
  if (brandExist) {
    return next(new appError(messages.brand.alreadyExist), 409);
  }
  //preper obj
  //upload image
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "hti-g1/brand",
    }
  );
  const slug = slugify(name);
  const brand = Brand({
    name,
    slug,
    logo: { secure_url, public_id },
    createdBy :req.authUser._id
  });
  // Add to db
  const createdBrand = await brand.save();
  if (!createdBrand) {
    //rillback
    req.failImage = { secure_url, public_id };
    return next(new appError(messages.brand.failToCreate, 500));
  }
  //send response
  return res.status(201).json({
    message: messages.brand.createdSuccessfully,
    success: true,
    data: createdBrand,
  });
};

export const updateBrand = async (req, res, next) => {
  //get data from req
  let { name } = req.body;
  const { brandId } = req.params;
  name = name.toLowerCase();
  //check existence
  const brandExiste = await Brand.findById(brandId);
  if (!brandExiste) {
    return next(new appError(messages.brand.notFound), 404);
  }
  //check name existence
  const nameExist = await Brand.findOne({ name, _id: { $ne: brandId } });
  if (nameExist) {
    return next(new appError(messages.brand.alreadyExist), 409);
  }
  //prepare data
  if (name) {
    const slug = slugify(name);
    brandExiste.name = name;
    brandExiste.slug = slug;
  }
  //upload image
  if (req.file) {
    // delete old image
    // await cloudinary.uploader.destroy(brandExiste.logo.public_id);
    // upload new image
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id : brandExiste.logo.public_id
      }
    );
    brandExiste.logo = { secure_url, public_id };
    req.failImage = { secure_url, public_id };
  }
  // update data
  const updatedBrand = await brandExiste.save();
  if (!updatedBrand) {
    return next(new appError(messages.brand.failToUpdeate), 500);
  }
  //send response
  return res.status(200).json({
    message: messages.brand.updatedSuccessfully,
    success: true,
    data: updatedBrand,
  });
};
