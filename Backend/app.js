const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const dotenv = require("dotenv").config();
require("./database/connect");
const stock = require("./routes/stockPg")
app.use(express.json());
const requestRoutes = require ("./routes/RequestBySeller");
const authRoutes = require('./routes/auth');



app.use('/api/v1/auth', authRoutes);
app.use("/api/v1",stock);

//const stock=require("./routes/stockPg");

app.use("/api/v1",requestRoutes);
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
});

