import { BasePage } from './BasePage';
import { LoginElements } from './LoginElements';
import { ROUTES } from '../../configs/constants';
import { User } from '../../domain/User';

export class LoginPage extends BasePage {
  protected readonly path = ROUTES.login;
  readonly el = new LoginElements(this.page);

  async login(username: string, password: string): Promise<void> {
    await this.el.username.fill(username);
    await this.el.password.fill(password);
    await this.el.submit.click();
  }

  async loginAs(user: User): Promise<void> {
  await this.login(user.username, user.password);
}

}