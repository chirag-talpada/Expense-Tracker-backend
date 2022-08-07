const express=require("express");
const cors=require('cors');
const app=express();

require("dotenv").config({path:"./config.env"});
const port=process.env.PORT||8080;

//middlewares
app.use(express.json());
app.use(cors());

//routers
app.use(require("./routes/route"));

//mongodb connection
const con=require("./db/connection");

con.then(db=>{
    if(!db) return process.exit(1);
    
    app.listen(port,()=>{
        console.log("Server is running on",port,"Port number");
    });

    app.on("error",err=>`Failed To Connect with HTTP Server: ${err}`);

}).catch(error=>{
    console.log(`Connection Failed...! ${error}`);
});

