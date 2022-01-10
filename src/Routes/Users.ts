import { getConnection } from "typeorm";
import { User } from '../Models/User';
import * as sha512 from 'js-sha512';
import express from 'express';

let router = express.Router();

router.get('/users', async (req, res) => {

    let users = await User.find({relations:[ "messages" ]})

    res.json({status: 200, data: users});
})

router.post('/users', async (req, res) => {
        
    let user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = sha512.sha512(req.body.password);

    let newUser = await getConnection().manager.save(user);

    res.json({status: 200, data: newUser});
})

router.get('/users/me', async (req, res) => {

    // @ts-ignore
    let user = await User.findOne({where: { id: req.user.id}});

    res.json({status: 200, data: user});
})


export default router;
