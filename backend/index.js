const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 5000;
const mongoDB = require("./db");
app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http:localhost:3000");
//     res.headers(
//         "Access-Control-Allow-Headers",
//         "Origin, X-equested-With, Content-Type, Accept"
//     );
//     next();
// })
mongoDB();
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use(express.json())
app.use('/api', require("./routes/CreateUser"))
app.use('/api', require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderData"))
app.get('/',(req,res)=>{
    res.send('Hello World! ----')
})
app.listen(port, () => {
    console.log(`Example app is listening on port ${port}`)
})

