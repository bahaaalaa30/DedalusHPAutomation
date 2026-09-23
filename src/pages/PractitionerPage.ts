import { expect, Locator, Page } from '@playwright/test';

export class PractitionerPage {
  private readonly patientsCount: Locator;
  private readonly facilityMenu: Locator;
  private readonly facilityOption: Locator;
  private readonly practitionerSelection: Locator;
  private readonly patient: Locator;
  private readonly newDocument: Locator;
  private readonly startConsultationButton: Locator;

  constructor(private readonly page: Page) {
    this.patientsCount = page.locator(
      'app-crm-leads div:nth-child(2) > div > div:nth-child(1) app-crm-quick-filters div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div'
    );
    this.facilityMenu = page.locator('#facility-menu');
    this.facilityOption = page.locator(
      '#facility-menu-actions > div > div > div > div > div:nth-child(3)'
    );
    this.practitionerSelection = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > div > div.diary-container > div.quick-filters > app-crm-quick-filters > div > div > div.quick-filter-list.ng-star-inserted > div:nth-child(2) > div.filter-name.has-count.no-icon'
    );
    this.patient = page.locator(
      'div.col-patient div.patient-name p.secondary-text'
    );
    this.newDocument = page.locator('div.new-actions.pointer');
    this.startConsultationButton = page.locator(
      'div.start-consult-dialog button.primary-button'
    );
  }

  async selectClinic() {
    await this.facilityMenu.waitFor({ state: 'visible', timeout: 15000 });
    await this.facilityMenu.click();
    await this.facilityOption.waitFor({ state: 'visible', timeout: 15000 });
    await this.facilityOption.click();
    return this;
  }

  async selectPractitioner() {
    await this.practitionerSelection.waitFor({ state: 'visible', timeout: 15000 });
    await this.practitionerSelection.scrollIntoViewIfNeeded();
    await this.practitionerSelection.click();
    return this;
  }

  async selectPatient() {
    await this.patient.waitFor({ state: 'visible', timeout: 15000 });
    await this.patient.click();
    return this;
  }

  async startConsultation() {
    await this.startConsultationButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.startConsultationButton.click();
    return this;
  }

  async createOrder() {
    await this.newDocument.waitFor({ state: 'visible', timeout: 15000 });
    await this.newDocument.click();
    return this;
  }

  async verifyLeadsCountIsGreaterThanOne() {
    await this.patientsCount.waitFor({ state: 'visible', timeout: 15000 });
    const n = Number((await this.patientsCount.innerText()).trim());
    expect(n).toBeGreaterThan(1);
  }
}
