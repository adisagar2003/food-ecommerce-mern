const express = require("express");
const cors = require("cors");
const { initializeApp } = require('firebase/app');
const path = require("path");

const corsOptions = {
  origin: "*",
};

require("dotenv").config();
const port = process.env.PORT || 5000;
const ConnectDB = require('./db/db_connect');
const app = express();
const product_route = require('./routes/product_route');

const firebaseConfig = {
    apiKey: "AIzaSyCUs1FNuw-fVm9qnJktEm0CWGhZ5KfmwX4",
    authDomain: "ecomfoodapp.firebaseapp.com",
    projectId: "ecomfoodapp",
    storageBucket: "ecomfoodapp.appspot.com",
    messagingSenderId: "248114869719",
    appId: "1:248114869719:web:47a45a2b27deaa61d70792"
  };

const firebaseApp = initializeApp(firebaseConfig);
//middlewares
console.log(__dirname);
app.use(express.static(__dirname + '/Web/dist/'));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/product', product_route);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Web/dist/index.html"));
});

app.listen(port, ()=> {
    ConnectDB();
    console.log(`listening on port ${port}`);
});