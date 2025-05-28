const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const signInRouter = require("./routes/signInRouter");
const logInRouter = require("./routes/logInRouter");
const newMessageRouter = require("./routes/newMessageRouter");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const { getUserByEmail, getUserById } = require("./db/queries");
require("dotenv").config() ;

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); //to use serialize and deserialize

app.get("/favicon.ico", (req, res) => res.status(204)); 
app.use("/", indexRouter);
app.use("/signIn", signInRouter);
app.use("/logIn", logInRouter);
app.use("/newMessage", newMessageRouter);


app.get("/logOut", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        return res.redirect("/");
    });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },

        async (email, password, done) => {
        try{
            const user = await getUserByEmail(email);

            if(!user) {
                return done(null, false, {message: "Incorrect email"});
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user);
        } catch(error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
  
      done(null, user);
    } catch(err) {
      done(err);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});


//use connect-pg-simple to store session in databse, instead of memory