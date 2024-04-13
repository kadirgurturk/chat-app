const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);

        console.log("connected to database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDatabase