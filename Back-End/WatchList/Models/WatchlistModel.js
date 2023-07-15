const mongoose = require('mongoose');
const WatchListSchema = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    countryname: {
        type: String,
        require: true
    },
    totaltested: {
        type: String,
        require: true
    },
    totaldeaths: {
        type: String,
        require: true
    },
    totalinfected: {
        type: String,
        require: true
    },
    totalrecovered: {
        type: String,
        require: true
    },
    lastupdate:{
        type: String,
        require:true
    }
});

module.exports = mongoose.model('WatchListModel', WatchListSchema, 'Lists');