const jwt = require("jsonwebtoken");

function authorize(req, res, next) {
    try {
        let reqtoken = req.headers['authorization']
        const token = reqtoken.replace('Bearer ', '')
        const result = jwt.verify(token, 'this is my secret for jwt')
        req.token = result
        next()
    }
    catch (err) {
        res.send("error in authorization")
    }
}

module.exports = { authorize }