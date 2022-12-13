const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");

const { createAdmin, getAllAdmins, loginAdmin } = require("../controller/admins");

// CREATE ADMIN
router.post('/register', verifyToken , createAdmin)

// GET ADMIN
router.get('/', verifyToken , getAllAdmins)

// LOGIN
router.post("/login", loginAdmin);

module.exports = router;