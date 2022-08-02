import { WarriorType } from './../enums/Type';
import { User } from './User'

export default interface Warrior {
    id: string,
    name: string,
    hp: string,
    mp: string,
    st: string,
    type: WarriorType,
    creator: User
}
