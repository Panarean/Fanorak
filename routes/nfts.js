var express = require('express');
const { ObjectId } = require('mongodb')
const {DBNAME} = require('../config');
const { authenticateToken } = require('./authenticator');
var router = express.Router();


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
router.post('/:id',authenticateToken,async function(req, res, next) {

    const id = req.params.id;
    console.log(id);
    let collection = global.mongoClient.db(DBNAME).collection('nfts');

    const nft = await collection.findOne({ _id: new ObjectId(id) });
    
    console.log(nft);
    res.send(nft);
});
router.post('/buy', authenticateToken,async function(req,res,next){
    
})
module.exports = router;
