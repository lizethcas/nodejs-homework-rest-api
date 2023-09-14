/* const ContactModel = require("../models/contacts"); */ // Importa las funciones directamente
const service = require("../service"); // Importa las funciones directamente
/* const Service = require("../service"); */

const listContacts = async (req, res, next) => {
  try {
    const results = await service.getAllContacts(); // Usa la función directamente

    res.json({ status: "success", code: 200, data: { contacts: results } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContactById(contactId);

    if (!contact) {
      // Si el contacto no se encuentra, responde con un código 404 y un mensaje de error
      return res.status(404).json({ error: "Contact not found" });
    }
    console.log(contact);
    res.status(200).json({ status: "success", code: 200, contact });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await service.removeContact(contactId);
    if (!contact) {
      // Si el contacto no se encuentra, responde con un código 404 y un mensaje de error
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "The contact was remove succesfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Contact not found" });
  }
};
const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await service.addContact(name, email, phone);

    res.status(201).json({
      status: "success",
      code: 201,
      message: `Contact ${newContact.id} added successfully`,
    });
  } catch (error) {
    console.error("Error:", error.message);

    if (error.message === service.ERROR_MESSAGES.CONTACT_ALREADY_EXISTS) {
      res
        .status(400)
        .json({ error: service.ERROR_MESSAGES.CONTACT_ALREADY_EXISTS });
    } else if (error.message === service.ERROR_MESSAGES.MISSING_PARAMETERS) {
      res
        .status(400)
        .json({ error: service.ERROR_MESSAGES.MISSING_PARAMETERS });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  // Verificar si el cuerpo está vacío
  if (!req.body || Object.keys(req.body).length === 0 ) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Request body is empty",
    });
  }
  if (!name||!email||!phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field params",
    });
  }

  try {
   
    const updatedContact = await service.updateContact(
      contactId,
      name,
      email,
      phone
    );
    res
      .status(200)
      .json({ status: "success", code: 200, contact: updatedContact });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Contact not found" });
  }
};
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  // Verificar si el cuerpo está vacío
  if (!req.body || Object.keys(req.body).length === 0 || !favorite) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
  }
  try {
  
    const updateStatusContact = await service.updateStatusContact(
      contactId,
      favorite
    );
    res
      .status(200)
      .json({ status: "success", code: 200, contact: updateStatusContact });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ error: "Contact not found" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,

  updateContact,
  updateStatusContact,
};
