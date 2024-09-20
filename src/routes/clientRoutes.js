const {
  sendMessage,
} = require("../controllers/clientController.js");
const Routes = (app) => {
  app.post("/send-message", sendMessage);
};

module.exports = Routes; // Export the Routes function directly, not as an object
