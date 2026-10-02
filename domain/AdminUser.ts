import { User } from './User';
import { ROLES } from '../configs/constants';

export class AdminUser extends User {
  get role(): string {
    return ROLES.admin;
  }

  // OVERRIDE: reemplaza describe() del padre, reutilizándolo con super
  override describe(): string {
    return `[ADMIN] ${super.describe()}`;
  }
}