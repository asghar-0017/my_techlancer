const express = require("express");
// const { ConnectDB } = require("./infrastructure/index.js");
const Routes = require("./routes/clientRoutes.js");
const app = express();
const cors = require('cors');  // Corrected the package name
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'*'
}))

Routes(app);

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
})

const start = () => {
  // ConnectDB()
  //   .then(() => {
  //     app.listen(process.env.PORT, () => {
  //       console.log(`Server is running on port ${process.env.PORT}`);
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  app.listen(process.env.PORT, () => {
          console.log(`Server is running on port ${process.env.PORT}`);
        });
      }



module.exports = { start };
