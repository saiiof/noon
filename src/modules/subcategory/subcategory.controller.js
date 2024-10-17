import slugify from "slugify";
import { appError } from "../../utils/appError.js";
import { messages } from "../../utils/constant/messages.js";
import { Category, Subcategory } from "../../../db/index.js";
import cloudinary, { deleteCloudeImage } from "../../utils/cloud.js";

//add subcategory
export const addSubcategory = async (req, res, next) => {
  //get data from req
  const { name, categoryId } = req.body;
  //check file
  if (!req.file) {
    return next(new appError(messages.file.required), 400);
  }
  // check existence
  const categoryExist = await Category.findById(categoryId);
  if (!categoryExist) {
    return next(new appError(messages.category.notFound), 404);
  }
  //chesck name existence
  const nameExist = await Subcategory.findOne({ name, category: categoryId });
  if (nameExist) {
    return next(new appError(messages.subcategory.alreadyExist), 409);
  }
  // uploude image 
  const {public_id , secure_url} = await cloudinary.uploader.upload(req.file.path , {
    folder : "hti-g1/subcategory"
  })
  req.failImage = {public_id}
  // prepare data
  const slug = slugify(name);
  const subcategory = new Subcategory({
    name,
    slug,
    category: categoryId,
    image: {public_id , secure_url},
  });
  
  //add to db
  const createdSubcategory = await subcategory.save();
  if (!createdSubcategory) {
    deleteCloudeImage(public_id)
    return next(new appError(messages.subcategory.failToCreate), 500);
  }
  return res
    .status(201)
    .json({
      message: "subcategory created successfully",
      sccess: true,
      data: createdSubcategory,
    });
};

//get Subcategory
export const getSubcategory = async (req,res,next) => {
    //get data from req
    const {categoryId} = req.params
    const subcategoryies = await Subcategory.find({category : categoryId})
    return res.status(200).json({success : true , data : subcategoryies })
}