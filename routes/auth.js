const { Router } = require("express");
const { check } = require("express-validator");
const { register, login, renew } = require("../controllers/auth");
const { fieldValidator } = require("../middlewares/field-validator");
const { JWTValidate } = require("../middlewares/jwt-validete");

const router = Router();

// create new user
router.post(
  "/register",
  [
    check("name", "Name fiedl is required").exists(),
    check("name", "Name has to have at least 2 characters").isLength(6),
    check("email", "email is required").exists(),
    check("email", "email has to have proper format")
      .normalizeEmail()
      .isEmail(),
    check("password", "select a password").exists(),
    check("password", "Password has to have at lest 6 characters")
      .trim()
      .isLength(6),
    fieldValidator,
  ],
  register
);

// User login -->( path, middelwares, controller)
router.post(
  "/login",
  [
    check("email", "Email field is required").isEmail(),
    check("password", "Password is obviosly required").isLength(6),
    fieldValidator,
  ],
  login
);

// revalidate token
router.get("/renew", JWTValidate, renew);

module.exports = router;
