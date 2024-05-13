const { default: mongoose } = require("mongoose");

const usersModel = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    city: String,
    number: String,
    password: String
})

export const userSchema = mongoose.models.users || mongoose.model("users", usersModel) 
