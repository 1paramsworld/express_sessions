const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const session = require('express-session');

const templatepath = path.join(__dirname, "../templates");
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.urlencoded({ extended: true })); // Add this line to parse form data

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get("/login", (req, res) => {
  res.render("login");
});

app.post('/login', (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);

  client.connect().then(() => {
    const db = client.db("paramshah");
    const collection = db.collection("paramdata");
    console.log(req.body.useremail);
    return collection.findOne({ email: req.body.useremail, password: req.body.userpassword });
  }).then((user) => {
    if (user) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.render("login", { error: "Invalid email or password" }); // Render login form with error
    }
  }).catch((error) => {
    console.error('Error:', error);
    res.render("login", { error: "An error occurred. Please try again later." }); // Render login form with generic error
  }).finally(() => {
    client.close(); // Close the MongoDB connection
  });
});

app.get("/", requireLogin, (req, res) => {
  res.send("Welcome to the home page");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect("/login");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
