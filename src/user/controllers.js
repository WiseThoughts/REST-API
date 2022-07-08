const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model")

exports.signUp = async (req, res)=>{
    try{
        const newUser = await User.create(req.body);
        const token = jwt.sign({id: newUser._id}, process.env.SECRET);
        res.send({user: newUser, token});
    }catch(error){
        console.log("sign up error", error)
        res.send({error});
    }
}

exports.login = async(req, res) => {
    try {
        res.send({ user: req.user.username });
    } catch (error) {
        console.log( error);
        res.send({error,message:"login error"});
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        const deleteUser = await User.findOneAndDelete({username: req.body.username})
        res.send({deleteUser})
    } catch (error) {
        console.log(error)
        res.send({error, message:"delete user error"})
    }
}

exports.listUsers =  async (req, res) => {
    try {
        const users = await User.find({});
        res.send({ users })
    } catch (error) {
        console.log(error);
        res.send({error})
    }
};

exports.updateUsername = async (req, res)=>{
    try{
        const updateUsername = await User.updateOne({email: req.body.email},{$set:{username: req.body.username}});
        res.send({updateUsername,  message: `updated username: ${req.body.username}`});
    }catch(error){
        console.log(error)
        res.send({error, message:"update username error"})
    }
};

exports.updateEmail = async (req, res)=>{
    try{
        const updateEmail = await User.updateOne({username: req.body.username}, {$set:{email: req.body.email}});
        res.send({updateEmail, message: `updated email: ${req.body.email}`});
    }catch(error){
        console.log(error)
        res.send({error, message:"update email error"})
    }
};

exports.updatePassword = async (req, res)=>{
    try{
        const updateUser = await User.updateOne({username: req.body.username}, {$set:{password: req.body.password}});
        res.send({updateUser, message: `updated password for ${req.body.username}`});
    }catch(error){
        console.log(error)
        res.send({error, message:"update password error"})
    }
};