const express = require('express');
const cors = require('cors');
const {createUser, listUsers, getUser} = require('./server/controllers/user');
const {newTransaction} = require('./server/controllers/transaction');

const router = express();
// const routes = express.Router();

//set CORS
router.use(cors());

//endpoints
router.post('/api/user/create', createUser);
router.get('/api/user/list', listUsers);
router.get('/api/user', getUser);

router.post('/api/user/beneficiary', getUser);
router.put('/api/user/beneficiary', getUser);
router.delete('/api/user/beneficiary', getUser);

router.post('/api/transaction/new', newTransaction);

module.exports = router;