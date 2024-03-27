
const express = require("express");
const {login, register, logout, googleLogin} = require("../controllers/authContoller");

const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route("/register").post(register)
authRouter.route("/logout").post(logout)
authRouter.route("/googlelogin").post(googleLogin);

module.exports = {
    authRouter
}