const express = require('express');
const cors = require('cors');
const {createUser, listUsers, getUserData} = require('./server/controllers/user');
const {newTransaction} = require('./server/controllers/transaction');
const {createBeneficiary, removeBeneficiary} = require('./server/controllers/beneficiaries');

const router = express();

//set CORS
router.use(cors());

//endpoints
router.post('/api/user/create', createUser);
router.get('/api/user/list', listUsers);
router.get('/api/user/:id', getUserData);

router.post('/api/user/beneficiary', createBeneficiary);
router.delete('/api/user/beneficiary', removeBeneficiary);

router.post('/api/transaction/new', newTransaction);

module.exports = router;