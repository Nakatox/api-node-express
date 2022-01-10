import { User } from '../Models/User';
import * as sha512 from 'js-sha512';
import * as jwt from 'jsonwebtoken';
import { secretKey } from '../app';
import express from 'express';

let router = express.Router();

router.post('/auth', async (req, res) => {

    let user = await User.findOne({where: { email: req.body.email, password: sha512.sha512(req.body.password)}})

    let token = jwt.sign({id: user.id}, secretKey)

    res.json({status: 200, data: token});
})

export default router;
