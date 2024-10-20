import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addProductVal = joi.object({
  name: generalFields.name.required(),
  description: generalFields.description.required(),
  stok: generalFields.stock,
  price: generalFields.price.required(),
  discount: generalFields.discount,
  discountType: generalFields.dicsountType,
  colors : generalFields.colors,
  sizes:generalFields.sizes,
  category: generalFields.objectId.required(),
  subcategory: generalFields.objectId.required(),
  brand: generalFields.objectId.required(),
});
