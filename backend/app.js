const express = require('express');
const router = require('./Routes/routes');
const connectDB = require('./config/dbConfig');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB().then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection failed:', error.message);
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
