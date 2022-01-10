import { createConnection} from "typeorm";
import { User } from './Models/User';
import { Message } from './Models/Message';


export const connexion = () => createConnection({
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