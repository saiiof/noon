import slugify from "slugify";
import { Brand, Product, Subcategory } from "../../../db/index.js";
import { appError } from "../../utils/appError.js";
import { messages } from "../../utils/constant/messages.js";
import cloudinary from "../../utils/cloud.js";
import { ApiFeature } from "../../utils/apiFeature.js";

//add product
export const addProduct = async (req, res, next) => {
  //get fata from req
  const {
    name,
    description,
    stok,
    price,
    discount,
    discountType,
    colors,
    sizes,
    category,
    subcategory,
    brand,
  } = req.body;
  //check existence
  //  1-brand
  const brandExist = await Brand.findById(brand); //{} , null
  if (!brandExist) {
    return next(new appError(messages.brand.notFound, 404));
  }
  //  2-subcategory
  const subcategoryExist = await Subcategory.findById(subcategory);
  if (!subcategoryExist) {
    return next(new appError(messages.subcategory.notFound), 404);
  }
  //upload images
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.mainImage[0].path,
    { folder: "hti-g1/products" }
  );
  let mainImage = { secure_url, public_id };
  req.failImages = [];
  failImages.push(public_id);
  let subImages = [];

  for (const file of req.files.subImages) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: "hti-g1/products/sub-images",
      }
    );
    subImages.push({ secure_url, public_id });
    req.failImages.push(public_id);
  }
  // prepare data

  const slug = slugify(name);
  const product = new Product({
    name,
    slug,
    description,
    stok,
    price,
    discount,
    discountType,
    colors: JSON.parse(colors),
    sizes: JSON.parse(sizes),
    category,
    subcategory,
    brand,
    mainImage,
    subImages,
    createBy: req.authUser._id,
    updatedby: req.authUser._id,
  });
  //add to db
  const createdProduct = await product.save();
  if (!createdProduct) {
    return next(new appError(messages.product.failToCreate), 500);
  }
  //send response
  return res.status(201).json({
    message: messages.product.createdSuccessfully,
    data: createdProduct,
    succcess: true,
  });
};

//get product
// pagination sort search filter
export const getAllProducts = async (req, res, next) => {
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .pagination()
    .sort()
    .select()
    .filter();
  const products = await apiFeature.mongooseQuery;
  return res.status(200).json({ succcess: true, data: products });
};
