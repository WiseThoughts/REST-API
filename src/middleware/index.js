const bcrypt = require('bcryptjs');
const User = require('../user/model')

exports.hashPassword = async(req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);
        next();
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

