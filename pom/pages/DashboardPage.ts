import { BasePage } from './BasePage';
import { Button } from '../elements/Button';
import { ROUTES } from '../../configs/constants';

export class DashboardPage extends BasePage {
  protected readonly path = ROUTES.dashboardPage;

  private readonly userMenu = new Button('User menu', this.page.locator('.oxd-userdropdown-tab'));
  private readonly logoutLink = new Button(
    'Logout',
    this.page.locator('.oxd-userdropdown-link').filter({ hasText: 'Logout' }),
  );

  async logout(): Promise<void> {
    await this.userMenu.click();
    await this.logoutLink.click();
  }
}