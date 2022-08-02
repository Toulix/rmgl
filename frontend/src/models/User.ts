import Warrior from "./Warrior";

export interface User {
    id: string,
    username: string;
    email: string;
    warrior: Warrior;
}
