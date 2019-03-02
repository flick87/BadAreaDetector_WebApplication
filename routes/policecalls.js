const express = require('express');
const router = express.Router();
const PoliceCallsModel = require('../models/PoliceCalls');


const bucketName = 'rmart167-cos';
const itemName = 'pd_calls.json';

router.get('/', (req, res) => {
    PoliceCallsModel.getItem(bucketName, itemName, (err, result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});

router.get('/dev', (req, res) => {
    res.json([{name:'alex', age:22},{name:'joselyne', age: 21}]);
});

module.exports = router;