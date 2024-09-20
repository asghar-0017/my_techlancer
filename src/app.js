const express = require("express");
const { ConnectDB } = require("./infrastructure/index.js");
const Routes = require("./routes/clientRoutes.js");
const app = express();
const dotenv=require('dotenv')
dotenv.config()

app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  
  Routes(app);
  
  app.get("/", (req, res) => {
    res.send("hello world");
  });

const start = ()=>{
    ConnectDB()
    .then(() => {
      app.listen(process.env.PORT, (req, res) => {
        console.log("server is running on port 3000");
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

  

module.exports= {start}