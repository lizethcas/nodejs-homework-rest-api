const Contact = require("./schemas/contacts");

const getAllContacts = async () => {
  try {
    const results = await Contact.find();
    console.log("Contactos recuperados con éxito:", results);
    return results;
  } catch (error) {
    console.error("Error al recuperar contactos:", error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};

module.exports = {
  getAllContacts,
  // Otras funciones del servicio si las tienes
};
