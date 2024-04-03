const mongoose = require('mongoose');

function dbConnection() {
    mongoose
        .connect(
            "mongodb+srv://mithun:1234@cluster0.7hlvy0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        )
        .then(() => console.log("Connected to MongoDB Atlas"))
        .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
}

module.exports = dbConnection ;