import slugify from "slugify";
import { appError } from "../../utils/appError.js";
import { messages } from "../../utils/constant/messages.js";
import { deleteFile } from "../../utils/file-functions.js";
import { Category, Subcategory } from "../../../db/index.js";
import cloudinary, { deleteCloudeImage } from "../../utils/cloud.js";

//add category
export const addCategory = async (req, res, next) => {
  //get data from req
  let { name } = req.body;
  name = name.toLowerCase();
  //check file
  if (!req.file) {
    return next(new appError(messages.file.required), 400);
  }
  //check existence
  const categoryEsiste = await Category.findOne({ name });
  if (categoryEsiste) {
    return next(new appError(messages.category.alreadyExist, 409));
  }
  //uploude image
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "hti-g1/category",
    }
  );
  let image = { public_id, secure_url };
  //prepare data
  const slug = slugify(name);
  const category = new Category({
    name,
    slug,
    image,
  });
  //add to db
  const createdCategory = await category.save();
  if (!createdCategory) {
    return next(new appError(messages.category.failToCreate, 500));
  }
  //send respose
  return res.status(201).json({
    message: messages.category.createdSuccessfully,
    success: true,
    data: createdCategory,
  });
};

// update category
export const updateCategory = async (req, res, next) => {
  //get data from req
  const { name } = req.body;
  const { categoryId } = req.params;
  //check existence
  const categoryExiste = await Category.findById(categoryId);
  if (!categoryExiste) {
    return next(new appError(messages.category.notFound, 404));
  }
  // check name existence
  const nameExiste = await Category.findOne({ name, _id: { $ne: categoryId } });
  if (nameExiste) {
    return next(new appError(messages.category.alreadyExist, 409));
  }
  //prepare date
  if (name) {
    categoryExiste.slug = slugify(name);
  }
  // update image
  if (req.file) {
    deleteCloudeImage(categoryExiste.image.public_id);
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "hti-g1/category",
      }
    );

    categoryExiste.image = { public_id, secure_url };
  }
  // updat to db
  const updaatedCategory = await categoryExiste.save();
  if (!updaatedCategory) {
    return next(new appError(messages.category.failToUpdeate, 500));
  }
  //send respones
  return res.status(200).json({
    message: messages.category.updatedSuccessfully,
    success: true,
    data: updateCategory,
  });
};

//delete category
export const deleteCategory = async (req, res, next) => {
  //get data from req
  const { categoryId } = req.params;
  //check existense
  const categoryExist = await Category.findById(categoryId);
  if (!categoryExist) {
    return next(new appError(messages.category.notFound, 404));
  }
  // delete from db
  deleteFile(categoryExist.image.path);
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  const deleteSubcategory = await Subcategory.deleteMany({
    category: categoryId,
  });
  if (!deletedCategory || !deleteSubcategory) {
    return next(new appError(messages.category.failToDelete));
  }
  return res
    .status(200)
    .json({ message: messages.category.deletedSuccessfully, success: true });
};

//getCategory
export const getCategory = async (req, res, next) => {
  const categories = await Category.find().populate([
    { path: "subcategories" },
  ]);
  return res.status(200).json({ success: true, data: categories });
};
