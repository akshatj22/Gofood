const mongoose = require('mongoose');
const dotenv = require('dotenv')
const mongoURI = process.env.DATABASE.replace('<password>',process.env.DATABASE_PWD)
mongoose.set('strictQuery', false);
const mongoDB = async () => {

    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data =  await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err,catData){
                    if(err) console.log(err);
                    else{
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
                // if (err) console.log(err);
                // else {
                //     global.food_items = data;
                //     // console.log(global.food_items);
                // }
            })
        }
    })
}

module.exports = mongoDB;





// dbname = gofoodmern
// pass = akshat
// user = akshat