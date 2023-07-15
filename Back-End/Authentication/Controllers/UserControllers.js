const repo = require('../Repository/Repository')
function RegisterUser(req, res) {
    repo.RegisterUser(req.body).then(data => {
        if (data.status === 409) {
            res.status(409).send({ status: 409, message: "User with specified email already exists" })
        }
        else if (data.status === 200) {
            res.status(200).send({ status: 200, message: "User Registered Successfully!", Data: data })
        }
        else {
            res.send()
        }
    })
}


function LoginUser(req, res) {
    repo.LoginUser(req.body).then(data => {
        if (data.status === 200) {
            res.status(data.status).send(data)
        }
        else if (data.status === 201) {
            res.status(data.status).send(data)
        }
        else {
            res.status(data.status).send(data)
        }
    })
}

function GetUser(req, res) {
    repo.GetUser(req.params).then(data => {
        if (data.status === 200) {
            res.status(200).send(data)
        }
        else {
            res.status(404).send(data.msg);
        }
    })
}


function UpdatePassword(req, res) {
    repo.UpdatePassword(req.token, req.body).then(data => {
        if (data.status === 200) {
            res.status(200).send(data)
        }
        else {
            res.status(404).send(data);
        }
    })
}


function UpdateProfile(req, res) {
    repo.UpdateProfile(req.token, req.body).then(data => {
        if (data.status === 200) {
            res.status(200).send(data.User)
        }
        else {
            res.status(404).send(data.msg);
        }
    })
}

module.exports = { RegisterUser, LoginUser, GetUser, UpdatePassword, UpdateProfile }