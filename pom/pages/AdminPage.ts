import { BasePage } from './BasePage';
import { AdminElements } from './AdminElements';
import { ROUTES } from '../../configs/constants';

export class AdminPage extends BasePage {
  protected readonly path = ROUTES.adminUsers;
  readonly el = new AdminElements(this.page);

  async searchByRole(role: string): Promise<void> {
    await this.el.userRole.select(role);
    await this.el.search.click();
  }
}