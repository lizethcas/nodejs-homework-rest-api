const Contact = require("./schemas/contacts");

const ERROR_MESSAGES = {
  CONTACT_ALREADY_EXISTS: "The contact already exists",
  MISSING_PARAMETERS: "Missing required parameters: name, email, phone",
};

const getAllContacts = async () => {
  try {
    const results = await Contact.find();
    return results;
  } catch (error) {
    console.error("Error al recuperar contactos:", error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};

const getContactById = async (contactId) => {
  try {
    // Utiliza Contact.findOne() para buscar un contacto por su ID

    const result = await Contact.findOne({ _id: contactId });

    if (!result) {
      // Si no se encuentra un contacto con ese ID, puedes devolver un mensaje o un valor especial
      return { message: "Contacto no encontrado" };
    }

    console.log("Contacto recuperado con éxito:", result);
    return result;
  } catch (error) {
    console.error("Error al recuperar el contacto:", error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      // Si no se eliminó ningún documento, puedes devolver un mensaje o un valor especial
      return { message: "Contacto no encontrado" };
    }

    console.log("Contacto eliminado con éxito:", result);
    return { message: "Contacto eliminado con éxito" };
  } catch (error) {
    console.error("Error al recuperar el contacto:", error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};

const addContact = async (name, email, phone) => {
  try {
    const findContact = await Contact.findOne({ email: email });
    if (!name || !email || !phone) {
      throw new Error(ERROR_MESSAGES.MISSING_PARAMETERS);
    }
    if (findContact) {
      throw new Error(ERROR_MESSAGES.CONTACT_ALREADY_EXISTS);
    }

    // Crea un nuevo contacto con los datos proporcionados
    const newContact = new Contact({
      name,
      email,
      phone,
    });

    // Guarda el nuevo contacto en la base de datos

    const result = await newContact.save();

    console.log("Contacto agregado con éxito:", result);
    return result;
  } catch (error) {
    console.error("Error al agregar el contacto:", error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};
const updateContact = async (contactId, name, email, phone) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      { name, email, phone },
      { new: true }
    );
  
    if (!updatedContact) {
      throw new Error("Contact not found");
    }

    console.log("Contacto actualizado con éxito:", updatedContact);
    return updatedContact;
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
    throw error;
  }
};
const updateStatusContact = async (contactId,favorite) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId }, // Criterios de búsqueda
      { $set: { favorite } }, // Actualización: Establece 'favorite' a true
      { new: true } // Opciones: Devuelve el documento actualizado
    );
    
    if (!favorite) {
      throw new Error(ERROR_MESSAGES.MISSING_PARAMETERS);
    }

    if (!updatedContact) {
      throw new Error("Contact not found");
    }

    console.log("Estado de contacto actualizado con éxito:", updatedContact);
    return updatedContact;
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
    throw error;
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  ERROR_MESSAGES,
};
