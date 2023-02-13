const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// opens a connection to a database and then starts a server on the specified port
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
});
