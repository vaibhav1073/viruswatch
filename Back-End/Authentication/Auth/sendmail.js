var nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const SECRET_KEY = 'this is my secret for jwt';
const UserModel = require("../Models/UserModel");
const jwt = require('jsonwebtoken');

function ForgetPassword(req, res){
        UserModel.findOne({ email: req.body.email }, (err,user)=>{
            if(!user){
                res.send({status:404, msg: "User not Found"});
            }
            else{
                const token = jwt.sign(req.body.email, SECRET_KEY);
                var transporter = nodemailer.createTransport({
                    service: 'outlook',
                    auth: {
                      user: 'covid19app.stackroute@outlook.com',
                      pass: 'covid19app'
                    }
                });
                
                var mailOptions = {
                    from: 'covid19app.stackroute@outlook.com',
                    to: req.body.email,
                    subject: 'Password reset link',
                    html: `<h1>Password Reset Link</h1> 
                            To reset your Password <a href="http://localhost:3000/resetpassword/${token}">Click Here</a> `  
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      res.send({status:200, msg: "Password Reset Link has been sent to your E-Mail"})
                    }
                });
            
                UserModel.findOneAndUpdate({ email: req.body.email },
                  { resetlink: token } , (err)=>{
                     if(err){
                         res.send(err);
                      }
                 });
            }
        })  

}

function ResetPassword(req, res) {
  const {password} = req.body;
  let resetlink = req.params.token;
  if (resetlink){
    jwt.verify(resetlink, SECRET_KEY, (err, decode) => {
      if(err){
        return res.send({status:401, msg: "Token Error"});
      }
      else{
        UserModel.findOne({resetlink}, (err, user) => {
          if(err || !user){
            return res.send({status:401, msg: "User with this token does not exist"});
          }
          const obj = {
            password: bcrypt.hashSync(password, 10),
            resetlink: ''
          }
          UserModel.findOneAndUpdate({ resetlink: resetlink },obj, (err)=>{
               if(err){
                   res.send(err);
                }
                else{
                  res.send({status:200, msg: "Password Updated Successfully!"})
                }
           });
          

        });
      }
    });
  }
  else{
    return res.send({status:401, msg: "Authentication error"});
  }
}


module.exports = {ForgetPassword, ResetPassword}