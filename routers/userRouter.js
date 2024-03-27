const express = require("express");
const {
    getAllUsers, getUser, editUser, deleteUser
} = require("../controllers/userControllers");

const {authenticate} = require("../middlewares/authenthicate");

const userRouter = express.Router();

userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUser);
userRouter.patch('/:id', authenticate, editUser );
userRouter.delete("/:id", authenticate, deleteUser);

module.exports = {
    userRouter
}