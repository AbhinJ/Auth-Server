const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const config = require("./config/dev");
const cors = require("cors");
require("./models/User");

mongoose.connect(config.mongoURI);

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

require("./routes/routes")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
