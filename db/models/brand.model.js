import { model, Schema } from "mongoose";

//schema
const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trum: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trum: true,
    },
    logo: {
      secure_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  { timestamps: true }
);
//model
export const Brand = model("Brand", brandSchema);
