import express from 'express';
import "reflect-metadata";

import * as bodyParser from 'body-parser';
let jwtExpress = require('express-jwt');
import { connexion } from './database';
import UsersRoute from './Routes/Users';
import MessagesRoute from './Routes/Messages';
import AuthRoute from './Routes/Auth';
import { secretKey } from './key';
import { User } from './Models/User';
import http from 'http';
import { Server } from 'socket.io';
let cors = require('cors');

// declare global 
declare global {
    namespace Express {
        interface Request {
            user: User
            io: Server
        }
    }
}

connexion();

// setup io server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
});


app.use(cors())
app.use(bodyParser.json());
app.use(jwtExpress({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: ['/auth', '/inscription'] }));

// middleware 
app.use( async (req, res, next) => {
    if (req.user){
        req.user = await User.findOne({where: { id: req.user.id}});
        next()
    }else{
        next()
    }

    req.io = io;
})

// routes api
app.use(UsersRoute);
app.use(MessagesRoute);
app.use(AuthRoute);

//event api
io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(8000);