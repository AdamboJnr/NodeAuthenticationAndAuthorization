const express = require('express');
const app = express();
const auth = require('./routes/auth');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/', auth);


app.listen(PORT, (req, res) => {
    console.log(`App listening to port: ${PORT}`);
})