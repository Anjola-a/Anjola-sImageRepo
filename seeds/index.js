const mongoose = require('mongoose');
const Image = require('../models/images');
const seedimages = require('./seedimages')

mongoose.connect('mongodb://localhost:27017/anjola-shopify', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database COnnected");
})

const seedDB = async () => {
    await Image.deleteMany({});
    for (let i = 0; i < 12; i++){
       const image =  new Image ({
           author: '5ff8e071da254061b8504709',
            title: seedimages[i].title,
            description: seedimages[i].description,
            imageurl: seedimages[i].imageurl

        })
        await image.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}); //executing the function