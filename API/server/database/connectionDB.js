const mongoose = require("mongoose");
// require("dotenv").config();


const connectmongo = async () => {
    try {
        const connectionDB = await mongoose.connect(`mongodb+srv://fasih:fasih@cluster5.zjxtuwq.mongodb.net/?retryWrites=true&w=majority`, {
        });
        console.log(`MongoDB connected : ${connectionDB.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectmongo;
