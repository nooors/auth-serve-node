const { Router } = require("express");
const { register, login, renew } = require("../controllers/auth");

const router = Router();

// create new user
router.post("/register", register);

// User login
router.post("/login", login);

// revalidate token
router.get("/renew", renew);

module.exports = router;
