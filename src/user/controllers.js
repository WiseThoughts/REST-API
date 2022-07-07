const User = require("./model")

exports.signUp = async (req, res)=>{
    try{
        const newUser = await User.create(req.body);
        res.send({user: newUser})
    }catch(error){
        console.log("sign up error", error)
        res.send({error});
    }
}

exports.login = async(req, res) => {
    try {
        res.send({ user: req.user.username });
    } catch (error) {
        console.log("login error", error);
        res.send({error});
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        const deleteUser = await User.findOneAndDelete({username: req.body.username})
        res.send({deleteUser})
    } catch (error) {
        console.log("delete user error", error)
        res.send({error})
    }
}

exports.listUsers =  async (req, res) => {
    try {
        const users = await User.find({});
        res.send({ users })
    } catch (error) {
        console.log("list error", error);
        res.send({ error })
    }
};