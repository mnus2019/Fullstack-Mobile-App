const express = require("express");
const bodyParser = require("body-parser");
const Member = require("../models/member");
const authenticate = require("../authenticate");
const cors = require('./cors');

const memberRouter = express.Router();

memberRouter.use(bodyParser.json());


memberRouter.route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Member.find()
       .then((member) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(member);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    Member.create(req.body)
      .then((member) => {
        console.log("Member Created ", member);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(member);
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    res.statusCode = 403;
    res.end("PUT operation not supported on /member");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

      Member.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );
  memberRouter.route('/:memberId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
      Member.findById(req.params.memberId)
      
      .then(member => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(member);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /coffees/${req.params.memberId}`);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Member.findByIdAndUpdate(req.params.memberId, {
          $set: req.body
      }, { new: true })
      .then(member => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(member);
      })
      .catch(err => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Member.findByIdAndDelete(req.params.memberId)
      .then(response => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
      })
      .catch(err => next(err));
  });
  

module.exports = memberRouter;
