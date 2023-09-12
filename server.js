const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const connection = require("./db/connection");
app.use(cors());

const routerApi = require("./api");
app.use("/api", routerApi);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "use api on routes /api/contacts",
    data: "Not found",
  });
});

app.use((error, _, res) => {
  console.error(error.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: error.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. ${err.message}`);
  });
