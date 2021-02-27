const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
const appmail = require('../config/appmail')
const User = mongoose.model('user');
// const Buy = mongoose.model('stock-buy');
// const Sell = mongoose.model('stock-sell');

var user_ID;


module.exports.register = (req,res,next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err,doc) => {
        if(!err)
            res.send(doc);
        else{
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found']);
            else
                return next(err);
        }
        
    });
}



module.exports.authenticate = (req, res, next)=> {
    passport.authenticate('local', (err, user, info)=> {
        if (err)
            return res.status(400).json(err);
        else if(user)
            return res.status(200).json({'token': user.generateJwt()});
        else
            return res.status(404).json(info);
    })(req,res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id}, (err, user)=>{
        user_ID = user._id;
        if(!user)
            return res.status(404).json({status: false, message: 'User record not found'});
        else
            return res.status(200).json({status: true, user: _.pick(user, ['uniqueID','fullName','email'] )});
    })
}

