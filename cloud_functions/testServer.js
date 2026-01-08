const express = require("express");
const bodyParser = require("body-parser");
const { validateOrder } = require("./validateOrder");

const app = express();
app.use(bodyParser.json());

app.post("/validateOrder", validateOrder);

app.listen(3000, () => {
  console.log("validateOrder running at http://localhost:3000/validateOrder");
});
