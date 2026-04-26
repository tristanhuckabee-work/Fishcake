const { check } = require("express-validator");
const { handleValidationErrors } = require("../util/validation.js");
// ----------------------------------------------------------------------------

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('minimum length of 3 characters.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('minimum length of 3 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('minimum length of 6 characters'),
  handleValidationErrors
];

module.exports = {
  validateLogin,
  validateSignup,
}