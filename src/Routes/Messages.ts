import { getConnection } from "typeorm";
import { User } from '../Models/User';
import { Message } from '../Models/Message';
import express from 'express';

let router = express.Router();

router.get('/messages', async (req, res) => {
    
    let messages = await Message.find({relations:[ "user" ]})

    res.json({status: 200, data: messages});
})

router.post('/messages', async (req, res) => {
    
    let message = new Message();
    message.text = req.body.content
    // @ts-ignore
    message.user = await User.findOne({where: { id: req.user.id}});

    let newMessage = await getConnection().manager.save(message);

    res.json({status: 200, data: newMessage});
})

export default router;
