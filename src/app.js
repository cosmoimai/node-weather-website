const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define path for express config
const publicdirectorypath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../template/views");
const partialspath = path.join(__dirname, "../template/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath); //takes path to the directory

//setup static directory to serve
app.use(express.static(publicdirectorypath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abhishek",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather",
    name: "abhishek",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to send the address other wise how will we work",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   address: `${req.query.address}`,
  //   forecast: "It is raining",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "this is help page",
    name: "abhishek bhaware",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "this is 404",
    name: "abhishek",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "this is 404",
    name: "abhishek",
    error: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
//app.com
//app.com/help
//app.com/about
// app.get("", (req, res) => {
//   res.send("<h1>Hello express!</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "abhishek",
//       age: 20,
//     },
//     {
//       name: "ritik",
//       age: 20,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   //res.send("<h1>This is about page</h1>");
// });
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
