import { User } from './User';
import { ROLES } from '../configs/constants';

export class EssUser extends User {
    get role(): string {
        return ROLES.ess;
    }
}