const WatchListModel = require("../Models/WatchlistModel");
const { v4: uuidv4 } = require('uuid');
function AddWatchList(data1, data2) {
    return new Promise((resolve, reject) => {
        WatchListModel.findOne({ countryname: data2.countryname, email: data1.email }, (err, list) => {
            if (list) {
                resolve({ status: 409, message: 'List already exists' })
            } else if (!list) {
                let list = new WatchListModel();
                list._id = uuidv4();
                list.email = data1.email;
                list.countryname = data2.countryname;
                list.totaltested = data2.totaltested;
                list.totaldeaths = data2.totaldeaths;
                list.totalinfected = data2.totalinfected;
                list.totalrecovered = data2.totalrecovered;
                list.lastupdate = data2.lastupdate;

                list.save((err) => {
                    if (!err) {
                        resolve({ status: 200, Data: list })
                    } else {
                        throw err;
                    }
                });
            } else {
                reject(err);
            }
        });
    })
}

function GetWatchList(data1) {
    return new Promise((resolve, reject) => {
        WatchListModel.find({ email: data1.email }, (err, list) => {
            if (!list) {
                resolve({ status: 404, message: 'List is not present' })
            }
            else {
                resolve(list);
            }
        })
    })
}

function DeleteList(data) {
    return new Promise((resolve, reject) => {
        WatchListModel.findOneAndDelete({ _id: data }, (err, result) => {
            if (!result) {
                resolve({ status: 404, message: 'List is not present' })
            }
            else {
                resolve(result);
            }
        })
    })
}

module.exports = { AddWatchList, GetWatchList, DeleteList }



