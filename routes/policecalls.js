const express = require('express');
const router = express.Router();
const PoliceCallsModel = require('../models/PoliceCalls');
const fs = require('fs');
const partial_data = require('../partial_data');


// const bucketName = 'rmart167-cos';
// const itemName = 'pd_calls.json';

const bucketName = 'policecalls';
const itemName = 'pd_calls.json';

router.get('/', (req, res) => {
    PoliceCallsModel.getItem(bucketName, itemName, (err, result) => {
        if(err){
            res.json(err);
        }else{
            console.log(typeof result);
            res.json(result); 
        }
    });
});

router.get('/dev', (req, res) => {
    res.json(partial_data);
});

module.exports = router;