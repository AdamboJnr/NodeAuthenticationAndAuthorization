const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const auth = require('./routes/auth');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const errorHandlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/', auth);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI, { useNewUrlParser: true,
             useUnifiedTopology: true, 
             useFindAndModify: true
            });
        
        const conn = mongoose.connection;

        conn.once('error', console.error.bind('error', 'Failed to connect to MongoDb'));

        conn.on('open', () => {
            console.log('Succesfully connected to MongoDB');
        })

        app.listen(PORT, (req, res) => { console.log(`App listening to port: ${PORT}`) });

    } catch (error) {
        console.log(error);
    }
}

start();