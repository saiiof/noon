import { model, Schema } from "mongoose";

//schema
const subcategorySchema = new Schema(
  {
    name: String,
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    slug: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: " User",
      required: true, 
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
//model
export const Subcategory = model("Subcategory", subcategorySchema);
