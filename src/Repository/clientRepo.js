const ClientModel = require('../model/clientModel'); 

const dataInRepo = async (data) => {
  try {
    const newClient = new ClientModel(data);
    return await newClient.save(); 
  } catch (error) {
    console.error('Error saving data to the repository:', error);
    throw error;
  }
};

module.exports=dataInRepo