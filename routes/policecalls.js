const express = require('express');
const router = express.Router();
const PoliceCallsModel = require('../models/PoliceCalls');
const fs = require('fs');
const partial_data = require('../partial_data');


const bucketName = 'rmart167-cos';
const itemName = 'pd_calls.json';

router.get('/', (req, res) => {
    PoliceCallsModel.getItem(bucketName, itemName, (err, result) => {
        if(err){
            res.json(err);
        }else{
            const count = req.query.count;
            const d = JSON.parse(result);
            const send = d.slice(0, count);
            res.json(send);
        }
    });
});

router.get('/dev', (req, res) => {
    const count = req.query.count;
    console.log(count);
    console.log(typeof partial_data);
    res.json(partial_data);
});

module.exports = router;