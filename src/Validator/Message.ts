import * as validator from 'express-validator';

export const messageValidator = validator.body("text").isLength({ min: 5, max: 2000 })
