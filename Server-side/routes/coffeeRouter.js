const express = require("express");
const bodyParser = require("body-parser");
const Coffee = require("../models/coffee");
const authenticate = require("../authenticate");
const cors = require('./cors');

const coffeeRouter = express.Router();

coffeeRouter.use(bodyParser.json());

coffeeRouter.route("/");
coffeeRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Coffee.find()
    .populate("comments.author")
      .then((coffee) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(coffee);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    Coffee.create(req.body)
      .then((coffee) => {
        console.log("Coffee Created ", coffee);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(coffee);
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /coffee");
  })
  .delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Coffee.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

  coffeeRouter.route('/:coffeeId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
      Coffee.findById(req.params.coffeeId)
      .populate('comments.author')
      .then(coffee => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(coffee);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /coffees/${req.params.coffeeId}`);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Coffee.findByIdAndUpdate(req.params.coffeeId, {
          $set: req.body
      }, { new: true })
      .then(coffee => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(coffee);
      })
      .catch(err => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Coffee.findByIdAndDelete(req.params.coffeeId)
      .then(response => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
      })
      .catch(err => next(err));
  });
  

module.exports = coffeeRouter;
