import * as validator from 'express-validator';

export const userValidator = [
validator.body("email").isEmail(),
validator.body("password").isLength({ min: 5, max: 40 }),
validator.body("firstname").isLength({ min: 4, max: 30 }),
validator.body("lastname").isLength({ min: 4, max:30 })]
