const mongoose = require("mongoose");
mongoose.Promise = global.promise;
require("dotenv").config();
const DB_HOST = process.env.DB_HOST;

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection
db.on('connected', () => {
  console.log('Conexión a la base de datos establecida correctamente');
});

module.exports = connection;
