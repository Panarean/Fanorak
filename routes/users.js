var express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignupParameters, validateSigninParameters } = require('../validators');
const {secretKey} = require('../config')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({});
});

router.post('/signin',async (req,res,next) => {
  let validationErrors = validateSigninParameters(req.body);
  if(Object.keys(validationErrors).length){
    console.log(validationErrors)
    return res.status(400).send({"error":"field error","data":validationErrors});
  }
  let collection = global.mongoClient.db('Fanorak').collection('users');

  const user = await collection.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send({"error":"servererror","data":err});
      } else if (isMatch) {
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        return res.status(200).send({"token":token})
      } else {
        return res.status(400).send({"error":"Invalid credential","data":{}})
      }
    });
  }
  else{
    return res.status(400).send({"error":"Invalid credential","data":{}})
  }
  
  
})
router.post('/signup',async (req,res,next) => {
  let validationErrors = validateSignupParameters(req.body);
  if(Object.keys(validationErrors).length){
    console.log(validationErrors)
    return res.status(400).send({"error":"field error","data":validationErrors});
  }
  let collection = global.mongoClient.db('Fanorak').collection('users');

  const existingDocument = await collection.findOne({ email: req.body.email });
  if (existingDocument) {
    return res.status(400).send({"error":"field error","data":{"email":"Email already exist"}})
  }
  let document = req.body;
  console.log(document);
  delete document.confirmPassword;

  document.password = await bcrypt.hash(document.password,10);

  collection.insertOne(document).then((result) => {
    return res.send({});
  })
  .catch((err) => {
    console.log('error',err);
    return res.status(500).send({"error":"ServerError","data":err});
  })
  
})
module.exports = router;
