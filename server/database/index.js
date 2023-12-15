const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.mongoDBURI);
		console.log(`Connected to Mongodb Database ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error in MongoDB ${error}`);
	}
};

module.exports = connectDB;
