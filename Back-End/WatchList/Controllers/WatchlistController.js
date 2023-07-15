const repo = require("../Repository/Repository")
function AddWatchList(req, res) {
    repo.AddWatchList(req.token, req.body).then(data => {
        if (data.status === 200) {
            res.status(200).send(data.Data)
        }
        else if (data.status === 409) {
            res.status(409).send(data.message);
        }
        else {
            res.send("Error");
        }
    })
}

function GetWatchList(req, res) {
    repo.GetWatchList(req.token).then(data => {
        res.send(data);
    })
}

function DeleteList(req, res) {
    repo.DeleteList(req.params).then(data => {
        res.send(data);
    })
}

module.exports = { AddWatchList, GetWatchList, DeleteList }