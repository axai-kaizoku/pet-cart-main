const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./database/index');
const authRoutes = require('./routes/authRoute');
const cors = require('cors');

//configure dotenv
dotenv.config();

//database configuration
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);

// rest api
app.get('/', (req, res) => {
	res.send({ message: 'Hello App is live' });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
