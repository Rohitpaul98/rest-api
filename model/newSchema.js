const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const newDataSchema = mongoose.Schema({
    userRole: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    city: String
})
newDataSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
const schemaModel = mongoose.model("schemaModel", newDataSchema)
module.exports = schemaModel;
