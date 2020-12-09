const express = require("express");
const app = express();
const PORT = process.env.PORT || 9999;
const mongoSession = require("connect-mongo")(session);
const mongoose = require("mongoose");
const authenticate = require("./routes/authenticate.js")
const passport = require("./passport/setup.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("Everyday I spend my time drinkin wine, feelin fine"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/willamettevaleywineries");

app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

app.use(session({
    secret: "dcbaae7c-5e91-4178-b8ca-2484d69893d6",
    resave: false,
    saveUninitialized: true,
    store: new mongoSession({mongooseConnection: mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/authenticate", authenticate);