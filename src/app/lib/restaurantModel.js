const { default: mongoose } = require("mongoose");

const restaurantModel = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    city: String,
    number: String,
    password: String
})

export const restaurantSchema = mongoose.models.restaurant || mongoose.model("restaurant", restaurantModel)