const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("./models/User");

mongoose.connect("mongodb://abhi:hluopb68@ds219051.mlab.com:19051/billy");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

require("./routes/routes")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
