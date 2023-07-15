const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./Routes/UserRoute');
const cors = require('cors');

const app = express();
// const DB_URI = 'mongodb+srv://Rohit-Kumar123:Bx30p1IqbOPBFC8f@rohitcluster.6c3odpo.mongodb.net/AuthDB?retryWrites=true&w=majority';
const DB_URI= 'mongodb://localhost:27017/AuthDB'
app.use(cors());


mongoose.connect(DB_URI);
mongoose.connection.once('open', (err) => {
    if (!err) {
        console.log('Connected to MongoDB');
    }
});

app.use(bodyParser.json());

app.use('/api', routes);

let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});