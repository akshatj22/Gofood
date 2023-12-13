const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')
const cors = require('cors');
const app = express();

app.use(cors());
// const bodyParser = require("body-parser")

// app.use(bodyParser.urlencoded({ extended: true }));

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            // res.send("Server Error", error.message)
            res.status("Server Error").send(error.message);
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            // res.send("Server Error", error.message)
            res.status("Server Error").send(error.message);
        }
    }
})

router.post('/myorderData',async(req,res)=>{
    try {
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        res.status("Server Error").send(error.message);
    }
})

module.exports = router