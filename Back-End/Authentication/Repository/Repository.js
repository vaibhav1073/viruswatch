const UserModel = require("../Models/UserModel");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const privateKey = "this is my secret for jwt"
function RegisterUser(data) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: data.email }, (err, user) => {
            if (user) {
                resolve({ status: 409, message: 'User with specified email already exists' })
            } else if (!user) {
                let user = new UserModel();
                user._id = uuidv4();
                user.firstname = data.firstname;
                user.lastname = data.lastname;
                user.city = data.city;
                user.email = data.email;
                user.phone = data.phone;
                user.resetlink="";
                user.password = bcrypt.hashSync(data.password, 10);
                user.save((err) => {
                    if (!err) {
                        resolve({ status: 200, Data: user })
                    } else {
                        throw err;
                    }
                });
            } else {
                reject(err);
            }
        });
    });
}

function LoginUser(data) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: data.email }, (err, user) => {
            if (user) {
                const comparison = bcrypt.compareSync(data.password, user.password)
                if (comparison) {
                    const payload = {
                        email: data.email
                    }
                    const genToken = jwt.sign(payload, privateKey, { expiresIn: '1h' })
                    resolve({ status: 200, msg: "login successfully", token: genToken })
                }
                else {
                    resolve({ status: 201, msg: "Check your password" })
                }
            }
            else {
                resolve({ status: 404, msg: "This Email Does not Exist" })
            }
        });
    });
}

function GetUser(data) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: data.email }, (err, user) => {
            if (!user) {
                resolve({ status: 404, msg: "User not Found" })
            }
            else {
                resolve({ status: 200, msg: "user found", User: user })
            }
        })
    })
}

function UpdatePassword(data1, data2) {
    return new Promise((resolve, reject) => {
        const hashedpassword = bcrypt.hashSync(data2.password, 10)
        UserModel.findOneAndUpdate({ email: data1.email }, { password: hashedpassword }, (err, user) => {
            if (!user) {
                resolve({ status: 404, msg: "User not Found" })
            }
            else {
                resolve({ status: 200, msg: "password updated", User: user.password })
            }
        })
    })
}

function UpdateProfile(data1, data2) {
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({ email: data1.email }, { firstname: data2.firstname, lastname: data2.lastname, city: data2.city, phone: data2.phone }, (err, user) => {
            if (!user) {
                resolve({ status: 404, msg: "User not Found" })
            }
            else {
                resolve({ status: 200, msg: "user profile updated", User: user })
            }
        })
    })
}
module.exports = { RegisterUser, LoginUser, GetUser, UpdatePassword, UpdateProfile }