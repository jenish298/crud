const express = require('express');

const {postdata, getallData,deletedata, updateData} = require('../controller/userdata.js');

const router = express.Router();

//add data
router.post('/add', postdata);
router.get('/list', getallData);
router.post('/del', deletedata);
router.put('/update', updateData);

module.exports = router;