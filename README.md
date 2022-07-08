# REST-API

NPM Nodules:
npm init -y
npm i express
npm i mongoose
npm i jsonwebtoken
npm i dotenv
npm i cors
npm i bcryptjs
npm i nodemon

Thunderclient commands:

-Make sure you are in the right address bar "http://localhost:5001"
-Change the query you are using (dependant on the route you are targeting)
-Then add the route you want to use at the end of the html link (e.g http://localhost:5001/login)
-If required add the search paramaters in the body of thunder client (e.g {"username":"", "password":""})


Routes: 

userRouter.post("/user", hashPassword, signUp); 
{"username":"", "password":"", "email":""} //adds a new user

userRouter.post("/login", decryptPassword, login); 
{"username":"", "password":""} //logs a user in

userRouter.get("/token", tokenCheck, login);

userRouter.delete("/delete", deleteUser);
{"username":""} //deletes a user and their data

userRouter.put("/username", updateUsername);
{"email":"", "username":"" } //searches for the user by the email and then updates the username 

userRouter.put("/email", updateEmail);
{"username":"", "email":""} //searches for the user by the username and then updates the email 

userRouter.put("/password", hashPassword, updatePassword);
{"username":"", "password":""} //searches for the user by the username and then updates the password



Middleware:

exports.hashPass = async (req, res, next) => {
    try {
        // const tempPass = req.body.password; //grabbed password variable from body, and stored it locally
        // const hashedPass = await bcrypt.hash(tempPass, 8); //hashed the password and stored it in a new constant
        // req.body.password = hashedPass; //stores freshly hashed password back in the req body
        req.body.password = await bcrypt.hash(req.body.password, 8); //all steps above, condensed into 1 line
        next(); //moves onto next middleware/controller in endpoint
    } catch (error) {
    console.log(error);
    res.send({ error, message:"error in hashing password" });
    }
};

exports.decryptPassword = async(req,res,next) => {
    try {
        req.user = await User.findOne({ username: req.body.username });
        if (await bcrypt.compare(req.body.password, req.user.password)) { //Compares the password in the body to the password in the users profile
            next();
        } else {
            throw new Error("Incorrect Username or Password");
        }
    } catch (error) {
        console.log(error);
        res.send({error})
    }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    // const token = req.header("Authorization"); //grab token from Authorization header in the request
    const decodedToken = jwt.verify(
      req.header("Authorization"),
      process.env.SECRET
    ); //decode token using same secret that created the token
    req.user = await User.findById(decodedToken.id); //finding the user by their id, stored in the token
    next();
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};


Controller example:

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body); 
            //req.body is an object that contains k/v pairs that match my User model
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET); 
            //sign method creates a token with object payload hidden in it
        res.send({ user: newUser, token });
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

exports.updateEmail = async (req, res)=>{
    try{
        const updateEmail = await User.updateOne({username: req.body.username}, {$set:{email: req.body.email}});
        //finds the user via the username, the new email is then set from the body email
        res.send({updateEmail, message: `updated email: ${req.body.email}`});
        //sends the data to http and sends a message to the response with the updated email.
    }catch(error){
        console.log(error)
        res.send({error, message:"update email error"})
    }
};