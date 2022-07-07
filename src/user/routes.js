const {Router} = require("express");
const {signUp, listUsers, login, deleteUser} = require("./controllers");
const {hashPassword, decryptPassword} = require ("../middleware/index.js")
const User = require("./model");
const userRouter = Router();


userRouter.post("/user", hashPassword, signUp);
userRouter.post("/login", decryptPassword, login);
userRouter.delete("/delete", deleteUser);
userRouter.get("/user", listUsers);


module.exports = userRouter;
