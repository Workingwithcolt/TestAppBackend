import { User } from "../Models/userModal.js";
import { MongodbControllerInterface } from "../MongoDB/mongodbcontroller.js";

const SKIP_AUTH = true;

export const USER_PATH = "User"

export class MongodbControllerFactory {
    getUserController(local) {
        return new MongodbControllerInterface(User, local);
    }
}
