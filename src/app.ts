import express from 'express';
import "reflect-metadata";

import * as bodyParser from 'body-parser';
let jwtExpress = require('express-jwt');
import { connexion } from './database';
import UsersRoute from './Routes/Users';
import MessagesRoute from './Routes/Messages';
import AuthRoute from './Routes/Auth';
import { secretKey } from './key';

const app = express();

connexion();
app.use(bodyParser.json());
app.use(jwtExpress({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: ['/auth'] }));

app.use(UsersRoute);
app.use(MessagesRoute);
app.use(AuthRoute);

app.listen(8000);