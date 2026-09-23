import { expect, Page } from '@playwright/test';

export class PractitionerPage {
  constructor(private readonly page: Page) {}

  private patient = this.page.locator('div.col-patient div.patient-name p.secondary-text');
  private patientsCount = this.page.locator('app-crm-quick-filters div:nth-child(2) div:nth-child(3) div').first();
  private newDocument = this.page.locator('div.new-actions.pointer');
  private startConsultationButton = this.page.locator('div.start-consult-dialog button.primary-button');

  async selectClinic() {
    await this.page.locator('#facility-menu').click();
    await this.page.locator('#facility-menu-actions > div > div > div > div > div:nth-child(3)').click();
  }

  async selectPatient() {
    await this.patient.click();
  }

  async startConsultation() {
    await this.startConsultationButton.click();
  }

  async createOrder() {
    await this.newDocument.click();
  }

  async verifyLeadsCountIsGreaterThanOne() {
    const n = Number((await this.patientsCount.innerText()).trim());
    expect(n).toBeGreaterThan(1);
  }
}
