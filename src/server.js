require("./db/connection.js")
const express = require("express"); 
const userRouter = require("./user/routes");
const app = express();
const port = process.env.PORT || 5001;


app.use(express.json());

app.use(userRouter);



app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
}); 