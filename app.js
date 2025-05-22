const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/favicon.ico", (req, res) => res.status(204)); 
app.use("/", indexRouter);


app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
