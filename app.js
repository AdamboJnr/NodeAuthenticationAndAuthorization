const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const auth = require('./routes/auth');
const notFound = require('./middleware/notFound');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/', auth);
app.use(notFound);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, (req, res) => { console.log(`App listening to port: ${PORT}`) })
    } catch (error) {
        console.log(error);
    }
}

start();