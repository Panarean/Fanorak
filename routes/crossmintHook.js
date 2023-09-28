var express = require('express');
var router = express.Router();
const {DBNAME} = require('../config')
const { ObjectId } = require('mongodb')

router.get('/', async function(req,res,next) {

    // Handle the relevant event types
    try {
        console.log(req.body)
    }
    catch (error) {
        console.log(error)
    }
    res.sendStatus(200);
  });

  router.post('/', async function(req,res,next) {

    // Handle the relevant event types
    try {
        console.log(req.body)
    }
    catch (error) {
        console.log(error)
    }
    res.sendStatus(200);
  });
  module.exports = router;