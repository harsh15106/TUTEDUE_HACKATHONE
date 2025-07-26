const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const dotenv = require("dotenv").config();
require("./database/connect");
const stock = require("./routes/stockPg")
app.use(express.json());
app.use("/api/v1",stock);

//const stock=require("./routes/stockPg");

//app.use("api/v1",books);
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
});

