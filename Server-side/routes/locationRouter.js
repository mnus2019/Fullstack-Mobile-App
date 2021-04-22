
const express = require('express');
const bodyParser = require('body-parser');
const location = require('../models/location');
const authenticate = require('../authenticate');
const cors = require('./cors');

const locationRouter = express.Router();

locationRouter.use(bodyParser.json());

locationRouter.route('/')
locationRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    location.find()
   
    .then(location => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    location.create(req.body)
    .then(location => {
        console.log('location Created ', location);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /location');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    location.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});  

locationRouter.route('/:locationId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Location.findById(req.params.locationId)
    .populate('comments.author')
    .then(location => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /coffees/${req.params.locationId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Location.findByIdAndUpdate(req.params.locationId, {
        $set: req.body
    }, { new: true })
    .then(location => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Location.findByIdAndDelete(req.params.locationId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
module.exports = locationRouter;