const express = require('express');
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cros = require("cors");

const connectmongo = require("../API/server/database/connectionDB")

const app = express();
app.use(cros());

// Parse JSON bodies for this app
app.use(express.json());

// MongoDB Connection
connectmongo();

// parser request to bady-parser
// Body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Parse URL-encoded bodies for this app
app.use(express.urlencoded({ extended: true }));



dotenv.config({ path: "config.env"});
const PORT = process.env.PORT || 5000;

// Routes  
app.use("/", require("../API/server/routes/router"));

app.listen(PORT, () =>{
    console.log(`server Running http://localhost:${PORT}`);
})