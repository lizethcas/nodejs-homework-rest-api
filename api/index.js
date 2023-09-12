const express = require("express");
const router = express.Router(); // Agrega los paréntesis aquí
const ctrlContact = require("../controllers/contacts");

router.get("/contacts", ctrlContact.listContacts);

module.exports = router;
