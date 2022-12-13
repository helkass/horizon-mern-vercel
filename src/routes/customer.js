const router = require("express").Router();
const {getAllCustomers, createCustomer, loginCustomer} = require("../controller/customers");

router.get('/', getAllCustomers);

router.post('/register', createCustomer);

router.post('/login', loginCustomer);

module.exports = router;