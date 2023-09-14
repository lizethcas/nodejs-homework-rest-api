const express = require("express");
const router = express.Router(); // Agrega los paréntesis aquí
const ctrlContact = require("../controllers/contacts");

router.get("/contacts", ctrlContact.listContacts);
router.get("/:contactId", ctrlContact.getContactById);
router.delete("/:contactId", ctrlContact.removeContact);
router.post("/", ctrlContact.addContact);
router.put("/:contactId", ctrlContact.updateContact);
router.patch("/:contactId", ctrlContact.updateStatusContact);

module.exports = router;
