const express = require("express");

const cors = require("cors");
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require('dotenv').config();

// Routes
require("./routes/userRoutes")(app);
require("./routes/movieRoutes")(app);

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});