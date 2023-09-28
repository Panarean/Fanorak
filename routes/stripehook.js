var express = require('express');
const stripe = require('stripe')('sk_test_51NtiAILM6m3RV12vNGEZPUo4Nz7wro2j8I4YDWC7yauw7kCF8JayjXhYpoVUNSealCsBHgG99nmLfMXv63dRC2qa00F954skxP');
var router = express.Router();
const {DBNAME} = require('../config')
const { ObjectId } = require('mongodb')
const endpointSecret = "whsec_9f7063900b3b979b56d9e14516c5f4a07dd09421ba93547e0c3faf161c8407f4";

router.post('/', async function(req,res,next) {

    // Handle the relevant event types
    try {
        let event= req.body
        const session = event.data.object;
    
        let payment = await payments.findOne({ id: session.id });
        if(payment == null || payment == undefined || !payment)
            res.sendStatus(400);
            switch (event.type) {
                case 'checkout.session.completed':
                    let email= session.customer_details.email;
                    console.log(email)
                    break;
                
                default:
                    console.log('Unhandled event type:', event.type);
            }
            } catch (error) {
                console.log(error)
            }
        res.sendStatus(200);
  });


  module.exports = router;