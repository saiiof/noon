const generateMessage = (entity) => ({
  alreadyExist: `${entity} already Exist`,
  notFound: `${entity} not found`,
  failToCreate: `fail to create ${entity}`,
  failToUpdeate: `fail to updeate ${entity}`,
  createdSuccessfully: `${entity} created successfully`,
  updatedSuccessfully: `${entity} updated successfully`,
  deletedSuccessfully: `${entity} deleted successfully`,
  failToDelete: `fail ro delte ${entity}`,
});
export const messages = {
  category: generateMessage("category"),
  subcategory: generateMessage("supcategory"),
  file: { required: "file is required" },
  brand: generateMessage("brand"),
  product: generateMessage("product"),
  user: {
    ...generateMessage("user"),
    verified: "user verifed successfully",
    invalidCredentials: "invated credentials",
    notAuthorized : "user not authorized to access this api"
  },
  review : generateMessage('review'),
  coupon : generateMessage('coupon')
};
