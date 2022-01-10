import express from 'express';
import "reflect-metadata";
import { createConnection} from "typeorm";
import { User } from './Models/User';
import { Message } from './Models/Message';

import * as bodyParser from 'body-parser';
let jwtExpress = require('express-jwt');

import UsersRoute from './Routes/Users';
import MessagesRoute from './Routes/Messages';
import AuthRoute from './Routes/Auth';

export const secretKey = 'UAbnbIUAUInOLNDIZDZCZyBHKUBuIUANILNj';
const app = express();

createConnection({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "node",
    entities: [
        User,
        Message
    ],
    synchronize: true,
    logging: false
})

app.use(bodyParser.json());
app.use(jwtExpress({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: ['/auth'] }));

app.use(UsersRoute);
app.use(MessagesRoute);
app.use(AuthRoute);

app.listen(8000);