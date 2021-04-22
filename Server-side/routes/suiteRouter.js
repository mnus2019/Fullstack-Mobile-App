const express = require('express');
const bodyParser = require('body-parser');
const Suite = require('../models/suite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const suiteRouter = express.Router();

suiteRouter.use(bodyParser.json());

suiteRouter.route('/')
suiteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Suite.find()
    .populate('comments.author')
    .then(suite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(suite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Suite.create(req.body)
    .then(suite => {
        console.log('Suite Created ', suite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(suite);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /suite');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Suite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

suiteRouter.route('/:suiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Suite.findById(req.params.suiteId)
    .populate('comments.author')
    .then(suite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(suite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /coffees/${req.params.suiteId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Suite.findByIdAndUpdate(req.params.suiteId, {
        $set: req.body
    }, { new: true })
    .then(suite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(suite);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Suite.findByIdAndDelete(req.params.suiteId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = suiteRouter;