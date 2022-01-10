import { getConnection } from "typeorm";
import { User } from '../Models/User';
import { Message } from '../Models/Message';
import express from 'express';
import { messageValidator } from "../Validator/Message";
import * as validator from 'express-validator';


let router = express.Router();

router.get('/messages', async (req, res) => {
    
    let messages = await Message.find({relations:[ "user" ]})

    res.json({status: 200, data: messages});
})

router.post('/messages',messageValidator, async (req, res) => {

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
            let message = new Message();
            message.text = req.body.content
            // @ts-ignore
            message.user = await User.findOne({where: { id: req.user.id}});

            let newMessage = await message.save();

            res.json({status: 200, data: newMessage});
        }
})

export default router;
