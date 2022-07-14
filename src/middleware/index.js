const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPassword = async(req, res, next) => {
    try {
        if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 8);
        } else if (req.body.updateObj.password){
            req.body.updateObj.password = await bcrypt.hash(req.body.updateObj.password, 8);
        } next();
    } catch (error) {
        console.log(error);
        res.send({error});
    }
};

exports.decryptPassword = async(req,res,next) => {
    try {
        req.user = await User.findOne({ username: req.body.username });
        if (await bcrypt.compare(req.body.password, req.user.password)) {
            next();
        } else {
            throw new Error("Incorrect Username or Password");
        }
    } catch (error) {
        console.log(error);
        res.send({error})
    }
};

exports.tokenCheck = async(req, res, next)=>{
    try{
        const decodedToken = jwt.verify(req.header("Authorization"), process.env.SECRET);
        req.user = await User.findById(decodedToken.id);
        next()
    }catch(error){
        console.log(error)
        res.send({error})
    }
}