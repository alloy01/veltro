import express from "express";
import { register, login, logout, isAuthenticated } from "../controllers/users/auth.js";
import userAuth from "../middlewares/auth_mw.js";

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.get('/is-auth',userAuth,isAuthenticated);


export default authRouter;