import bcrypt from "bcrypt";
import { appError } from "../../utils/appError.js";
import { messages } from "../../utils/constant/messages.js";
import { sendEmail } from "../../utils/email.js";
import { generateToken, verifyToken } from "../../utils/token.js";
import { status } from "../../utils/constant/enums.js";
import { User } from "../../../db/index.js";

export const signup = async (req, res, next) => {
  //get data from req
  let { name, email, password, phone } = req.body;
  // check existence
  const userExist = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExist) {
    return next(new appError(messages.user.alreadyExist, 409));
  }
  //prepare data
  password = bcrypt.hashSync(password, 8);
  const user = new User({
    name,
    email,
    password,
    phone,
  });
  //save to db
  const createdUser = await user.save();
  if (!createdUser) {
    return next(new appError(messages.user.failToCreate, 500));
  }
  //generate token
  const token = generateToken({ payload: { email } });
  //send email

  sendEmail({
    to: email,
    subject: "vrfiy your account",
    html: `<p>click on link to verifiy account <a href =
     "${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a></a></p>`,
  });
  //send response
  return res.status(201).json({
    message: messages.user.createdSuccessfully,
    success: true,
    data: createdUser,
  });
};

export const verifyAcconunt = async (req, res, next) => {
  //get data from req
  const { token } = req.params;
  const payload = verifyToken({ token });
  await User.findOneAndUpdate(
    { email: payload.email, status: status.PENDING },
    { status: status.VERIFIED }
  );
  return res
    .status(200)
    .json({ message: messages.user.verified, success: true });
};

export const login = async (req, res, next) => {
  //get data from req
  const { email, phone, password } = req.body;
  //check existence
  const userExist = await User.findOne({ $or: [{ phone }, { email }] });
  if (!userExist) {
    return next(new appError(messages.user.invalidCredentials, 400));
  }
  //check passowrd
  const match = bcrypt.compareSync(password, userExist.password);
  if (!match) {
    return next(new appError(messages.user.invalidCredentials, 400));
  }
  //genreate token
  const token = generateToken({ payload: { _id: userExist._id, email } });
  //send response
  return res
    .status(200)
    .json({ message: "login successfully", success: true, token });
};
