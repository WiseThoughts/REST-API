const {Router} = require("express");
const {signUp, listUsers, login, deleteUser, updateUsername, updatePassword, updateEmail, deleteUserTok, updateUser} = require("./controllers");
const {hashPassword, decryptPassword, tokenCheck} = require ("../middleware/index.js")
const User = require("./model");
const userRouter = Router();


userRouter.post("/user", hashPassword, signUp);
userRouter.post("/login", decryptPassword, login);
userRouter.get("/token", tokenCheck, login);
userRouter.delete("/delete", deleteUser);
userRouter.put("/username", updateUsername);
userRouter.put("/password", hashPassword, updatePassword);
userRouter.put("/email", updateEmail);
userRouter.get("/users", listUsers);
userRouter.delete("/user",tokenCheck, deleteUserTok);
userRouter.patch("/user", hashPassword, updateUser);


module.exports = userRouter;
