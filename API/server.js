const express = require('express');
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cros = require("cors");
const path = require("path");

const connectmongo = require("../API/server/database/connectionDB")

const app = express();
app.use(cros());

// Parse JSON bodies for this app
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
connectmongo();

// parser request to bady-parser
// Body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Parse URL-encoded bodies for this app
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static(path.join(__dirname, 'img')))
// app.use('/img', express.static('img'))


dotenv.config({ path: "config.env"});
const PORT = process.env.PORT || 5000;

// Routes  
app.use("/", require("../API/server/routes/SuperAdminRoutes/router"));
app.use("/house", require("./server/routes/SuperAdminRoutes/house.router"));
app.use("/whislist", require("./server/routes/cart.router"));
app.use("/create-checkout-session", require("./server/routes/stripe.router"));

app.listen(PORT, () =>{
    console.log(`server Running http://localhost:${PORT}`);
})