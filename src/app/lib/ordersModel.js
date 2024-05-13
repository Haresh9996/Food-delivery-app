const { default: mongoose } = require("mongoose");

const ordersModel = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    user_name: String,
    user_number: String,
    user_address: String,
    resto_id: mongoose.Schema.Types.ObjectId,
    food_id: String,
    amount: String
})

export const orderSchema = mongoose.models.orders || mongoose.model("orders", ordersModel)