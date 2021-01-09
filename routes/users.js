// //config
//IN CONSTRUCTION!


// const express= require('express');
// const passport = require('passport');
// const router = express.Router(); //*
// const LocalStrategy = require('passport-local');
// const User = require('../models/user');
// const session = require('express-session');
// // const { isLoggedIn } = require('../middleware')


// router.use(passport.initialize());
// router.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// //routes
// router.get('/register', (req, res) => {
//     res.render('users/register')
// });

// router.get('/now', (req, res) => {
//     if(!req.isAuthenticated()){
//         console.log("you need to sign in");
//         res.redirect('/login')
//     }else{
//         res.render('home')
//     }
    
// });
// router.post('/register', (req, res) => {
//     // try {
//         const { email, username, password } = req.body;
//         const user = new User({email, username});
//          User.register(user, password, (err,Ruser) =>{
//              if(err){
//                  console.log(err);
//                  return res.render("register")
//              }
//              passport.authenticate("local") (req,res, function(){
//                 res.redirect('/images')
//              }
//              )
//          });
        
        
   
// })



// router.get('/login', (req,res) => {
//     res.render('users/login')
// } ) 

// router.post('/login', 
//   passport.authenticate('local', { successRedirect: '/images', failureRedirect: '/login' }),
  
//   function(req, res) {
//     console.log("login " + isAuthenticated)
//   });

// router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('images');
// })



// function isLoggedIn(req,res, next){
//     if(req.isAuthenticated()){
//         return next();
//     };
//     res.redirect("/login")
// }

// module.exports = router;