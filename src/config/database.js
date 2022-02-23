const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/tutorials";

module.exports = async () => {
    await mongoose.connect(connectionString);
}
