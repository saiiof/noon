import {
  authRouter,
  brandRouter,
  categoryRouter,
  couponRouter,
  productRouter,
  reviewRouter,
  subcategoryRouter,
  wishlistRouter,
} from "./modules/index.js";

export const initApp = (app, express) => {
  //parse req
  app.use(express.json());
  // category api
  app.use("/category", categoryRouter);
  // subcategory api
  app.use("/sub-category", subcategoryRouter);
  // brand api
  app.use("/brand", brandRouter);
  //product api
  app.use("/product", productRouter);
  //auth api 
  app.use("/auth" ,authRouter)
  //review router
  app.use("/review",reviewRouter)
  //coupon router 
  app.use('/coupon',couponRouter)
  //wishlist api 
  app.use('/wishlist',wishlistRouter)
};
