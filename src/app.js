const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

// console.log(__dirname);
// console.log(path.join(__dirname,'../public/index.html'));

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //folder path to where views are stored.
const partailsPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and location if required
app.set("view engine", "hbs");
app.set("views", viewsPath); // ->> do this if wanting to renae views folder as by default hbs will render views from that folder
hbs.registerPartials(partailsPath);

// static directory to be used
app.use(express.static(publicDirPath));

//routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Neet",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Neet",
    msg: "This is some extremely helpful text.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Neet",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    // = {} has been done so doesn't crash in error scenario when lat long location do not exist
    if (error) {
      return res.send({
        error: error
      });
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({error}); // short hand
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  res.send({
    products: [],
  });
});

// targeted 404 page
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found!",
    name: "Neet",
    title: "Oops: 404",
  });
});

//404 page catch all
app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found!",
    name: "Neet",
    title: "Oops: 404",
  });
});

//initialize app
app.listen(3000, () => {
  console.log("Listening on Port 3000!");
});
