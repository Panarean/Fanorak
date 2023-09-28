var express = require('express');
const { ObjectId } = require('mongodb')
const {DBNAME} = require('../config');
const { authenticateToken } = require('./authenticator');
var router = express.Router();
const stripe = require("stripe")('sk_test_51NtiAILM6m3RV12vNGEZPUo4Nz7wro2j8I4YDWC7yauw7kCF8JayjXhYpoVUNSealCsBHgG99nmLfMXv63dRC2qa00F954skxP');


/* GET users listing. */
router.post('/',authenticateToken,async function(req, res, next) {
    let collection = global.mongoClient.db(DBNAME).collection('nfts');
    const {condition} = req.body;
    const cursor = collection.find(condition);
    let nfts = [];
    while (await cursor.hasNext()) {
        nfts.push(await cursor.next());
    }
    console.log(nfts);
    res.send(nfts);
});

router.post('/buy',authenticateToken, async function(req,res,next){
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
})

router.post('/:id',authenticateToken,async function(req, res, next) {

    const id = req.params.id;
    console.log(id);
    let collection = global.mongoClient.db(DBNAME).collection('nfts');

    const nft = await collection.findOne({ _id: new ObjectId(id) });
    
    console.log(nft);
    res.send(nft);
});


module.exports = router;
