const passport = require('passport')
const LocalStrategy = require('passport-local')
const Users = require('../domain/model/user')
const Host = require('../domain/model/host')

passport.use('userLocal',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'pass'
        }, (email, pass, done) => {
            // console.log(type)
                Users.findOne({ email }).then(user => {
                    if (!user || !user.validPassword(pass)) {
                        return done(null, false, {
                            err: 'email or password is invalid'
                        });
                    }
                    return done(null, user)
                });
        }),
)

passport.use('hostLocal',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField:'pass'
        },(email,pass,done) => {
            Host.findOne({email}).then(host =>{
                if(!host || !host.validPassword(pass)){
                    return done(null,false,{
                        err: 'email or password is invalid'
                    });
                }
                return done(null, host)
            });
        }),
    
)

module.exports = passport