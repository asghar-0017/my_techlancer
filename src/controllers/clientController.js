const  {sendMessageTOService,sendSubscriptionToService}  = require("../services/clientServices");

const sendMessage = async (req, res) => {
  try {
    const data = req.body; 
    await sendMessageTOService(data)

    // Send success response
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error('Error in sendMessage controller:', err);

    // Send error response
    res.status(500).json({ 
      message: "Failed to send message", 
      error: err.message 
    });
  }
};

const subscription = async (req, res) => {
  try {
    const data = req.body; 
    await sendSubscriptionToService(data)

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error('Error in sendMessage controller:', err);

    res.status(500).json({ 
      message: "Failed to send message", 
      error: err.message 
    });
  }
};

module.exports = { sendMessage,subscription };
