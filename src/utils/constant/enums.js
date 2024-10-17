export const discountTypes = {
  FIXED_AMOUNT: "fixedAmount",
  PERCENTAGE: "percentage",
};
Object.freeze(discountTypes);

export const roles = {
  USER: "user",
  ADMIN: "admin",
  SELLER: "seller",
};
Object.freeze(roles);
export const orderStatus = {
  PLACED: "placed",
  SHIPPING: "shipping",
  DELIVERED: "delivered",
  CANCELED: "canceled",
  REFUNDED: "refunded",
};
Object.freeze(orderStatus);
export const status = {
  PENDING: "pending",
  VERIFIED: "verified",
  PLOCKED: "plocked",
};
Object.freeze(status)

export const paymentMethods = {
  CASH: "cash",
  VISA: "visa",
};