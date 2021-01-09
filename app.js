const express    = require("express");
const session = require('express-session');
const path = require('path'); //what does this mean?
const mongoose = require('mongoose');
const Image = require('./models/images');
const methodOverride = require('method-override')


const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');




const ejsMate = require('ejs-mate');
const { isLoggedIn } = require('./middleware')

const userRoutes = require('./routes/users');
const MongoDBStore = require("connect-mongo")(session);

//string temperate literal?
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/anjola-shopify';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const	app        = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const secret = process.env.SECRET || 'Anjolagotthejob!';

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use('/', userRoutes);
const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    secret: 'Anjolagotthejob!',
    resave: false, 
    saveUninitialized: false
    
        //when log in expires
}
app.use(session(sessionConfig))



passport.use(new LocalStrategy(User.authenticate()));
//use local strategy to authenticate user

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());// get user out of a session
//how to store User in a session

app.use(passport.initialize());
app.use(passport.session());
//auth

app.use(function(req, res, next){
	res.locals.currentUser= req.user;
	next();
	//res.locals is what is available in our templatess
});



app.get('/',  async (req,res) =>{
    console.log(req.isAuthenticated())
    const images = await Image.find({})
    res.render('home', {images:images})
})

app.get('/images', async (req, res) => { //figure out what this means
    console.log(req.user);    
    const images = await Image.find({})
    console.log(req.isAuthenticated())
    res.render("home", {images:images});
})

app.post('/images', isLoggedIn, async (req, res) => {
    const image = new Image(req.body.image);
    image.author = req.user._id;
    await image.save();
    res.redirect(`/images/${image._id}`);
})


app.get('/images/new', isLoggedIn, async (req, res) => { //figure out what this means
    res.render("new");
})

app.get('/images/:id', async (req, res) => { //figure out what this means
    const image = await Image.findById(req.params.id).populate('author');
    res.render("show", {image:image});
})

app.delete('/images/:id', async (req, res) => {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    res.redirect('/images');
})

app.listen(3000, () =>{
    console.log("Server is listening");
})

