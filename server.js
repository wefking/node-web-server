const express = require("express");
const hbs = require("hbs");
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  // console.log(`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  })
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// })

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return 'test'
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  // res.send('<h1>Hello Express!</h1>');

  // res.send({
  //     name: "william",
  //     like: [
  //         "travel",
  //         "fruits"
  //     ]
  // });
  res.render("home.hbs", {
    pageTitle: "Home Page",
    // currentYear: new Date().getFullYear(),
    welcome: "hello all"
  });
});

app.get("/about", (req, res) => {
  // res.send("About page");
  res.render("about.hbs", {
    pageTitle: "About Page",
    // currentYear: new Date().getFullYear()
  });
});

app.get("/projects", (req, res) => {
  // res.send("About page");
  res.render("projects.hbs", {
    pageTitle: "Projects",
    // currentYear: new Date().getFullYear()
  });
});

app.get("/bad", (req, res) => {
  res.send({
    error: 50,
    message: "Bad link"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
