import { getConnection } from "typeorm";
import { User } from '../Models/User';
import * as sha512 from 'js-sha512';
import express from 'express';
import { connexion } from '../database';
import { userValidator } from "../Validator/User"; ;
import * as validator from 'express-validator';

let router = express.Router();

router.get('/users', async (req, res) => {

    let users = await User.find({relations:[ "messages" ]})

    res.json({status: 200, data: users});
})

router.post('/users', userValidator , async (req, res) => {
        
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
            let user = new User();
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.password = sha512.sha512(req.body.password);
    
            let newUser = await user.save();
    
            res.json({status: 200, data: newUser});
        }
})

router.get('/users/me', async (req, res) => {

    // @ts-ignore
    let user = await User.findOne({where: { id: req.user.id}});

    res.json({status: 200, data: user});
})


export default router;
