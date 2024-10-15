const {
  sendMessage,
  subscription
} = require("../controllers/clientController.js");
const Routes = (app) => {
  app.post("/send-message", sendMessage);
  app.post("/Subscription", subscription);
  
}

module.exports = Routes;
