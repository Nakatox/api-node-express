import axios from "axios";
import { User } from "../Models/User";

class RandomUser {
    static async getOne(){
        let response = await axios.get('https://randomuser.me/api/')

        let user = response.data.results[0] as User;

        return user
    }
}


export default RandomUser;