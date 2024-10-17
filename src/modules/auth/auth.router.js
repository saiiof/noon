import { Router } from "express";
import { asyncHandeler } from "../../middleware/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";
import { loginVal, signupVal } from "./auth.validation.js";
import { signup, verifyAcconunt } from "./auth.controller.js";

const authRouter = Router()
//sign up 
authRouter.post('/signup' ,isValid(signupVal), asyncHandeler(signup))
authRouter.get('/verify/:token',asyncHandeler(verifyAcconunt))
authRouter.post('/login',isValid(loginVal) )
export default authRouter