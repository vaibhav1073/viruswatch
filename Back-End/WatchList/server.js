const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./Routes/WatchlistRoutes');

const DB_URI= 'mongodb://localhost:27017/WatchlistDB';
app.use(cors());

mongoose.connect(DB_URI);
mongoose.connection.once('open', (err) => {
    if (!err) {
        console.log('Connected to MongoDB');
    }
});

app.use(bodyParser.json());
app.use('/api', routes);


let port = process.env.PORT || 9000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})