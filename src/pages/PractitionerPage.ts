import { expect, Locator, Page } from '@playwright/test';

export class PractitionerPage {
  private readonly patientsCount: Locator;
  private readonly facilityMenu: Locator;
  private readonly facilityOption: Locator;
  private readonly practitionerSelection: Locator;
  private readonly patient: Locator;
  private readonly newDocument: Locator;
  private readonly startConsultationButton: Locator;
  private readonly clinicianRole: Locator;
  private readonly continueRoleButton: Locator;

  constructor(private readonly page: Page) {
    this.patientsCount = page.locator(
      'xpath=/html/body/app-root/app-crm/div/div/app-crm-leads/div[2]/div/div[1]/app-crm-quick-filters/div/div/div[2]/div[2]/div[3]/div'
    );
    this.facilityMenu = page.locator('#facility-menu');
    this.clinicianRole = page.locator('#role_clinic');
    this.continueRoleButton = page.getByRole('button', {
      name: 'Continue',
      exact: true
    });
    this.facilityOption = page.locator(
      '#facility-menu-actions > div > div > div > div > div:nth-child(3)'
    );
    this.practitionerSelection = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > div > div.diary-container > div.quick-filters > app-crm-quick-filters > div > div > div.quick-filter-list.ng-star-inserted > div:nth-child(2) > div.filter-name.has-count.no-icon'
    );
    this.patient = page
      .locator('div.col-patient div.patient-name > p.no-margin')
      .first();
    this.newDocument = page.locator('div.new-actions.pointer');
    this.startConsultationButton = page.locator(
      'div.start-consult-dialog button.primary-button'
    );
  }

  async continueRole() {
    await expect(this.continueRoleButton).toBeEnabled({
      timeout: 10000
    });
    await this.continueRoleButton.click();
    return this;
  }

  async selectRole() {
    await this.clinicianRole.waitFor({
      state: 'visible',
      timeout: 15000
    });
    await this.clinicianRole.check();
    await expect(this.clinicianRole).toBeChecked();
    return this;
  }

  async selectClinic() {
    await this.facilityMenu.waitFor({ state: 'visible', timeout: 15000 });
    await this.facilityMenu.click();
    await this.facilityOption.waitFor({ state: 'visible', timeout: 15000 });
    await this.facilityOption.click();
    return this;
  }

  async selectPractitioner() {
    await this.practitionerSelection.waitFor({
      state: 'visible',
      timeout: 15000
    });
    await this.practitionerSelection.scrollIntoViewIfNeeded();
    await this.practitionerSelection.click();
    return this;
  }

  async selectPatient(patientName: string, patientId: string) {
    const patientRows = this.page.locator('.patients-list-item');

    await patientRows.first().waitFor({
      state: 'visible',
      timeout: 20000
    });

    const matchingRows: Locator[] = [];
    const rowCount = await patientRows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = patientRows.nth(i);
      const name = (
        await row.locator('.patient-name p.no-margin').textContent() ?? ''
      ).trim();
      const secondaryText = (
        await row.locator('.patient-name p.secondary-text').textContent() ?? ''
      ).trim();
      const rowPatientId = secondaryText.split(/[，,]/)[0].trim();

      if (name === patientName.trim() && rowPatientId === patientId.trim()) {
        matchingRows.push(row);
      }
    }

    expect(
      matchingRows,
      `Expected exactly one patient matching name "${patientName}" and ID "${patientId}". Found ${matchingRows.length}.`
    ).toHaveLength(1);

    await matchingRows[0].scrollIntoViewIfNeeded();
    await matchingRows[0].click();

    console.log(
      `✅ Selected patient in practitioner page: ${patientName} | ${patientId}`
    );

    return this;
  }

  async startConsultation() {
    await this.startConsultationButton.waitFor({
      state: 'visible',
      timeout: 15000
    });
    await this.startConsultationButton.click();
    return this;
  }

  async createOrder() {
    await this.newDocument.waitFor({ state: 'visible', timeout: 15000 });
    await this.newDocument.click();

    const contentContainer = this.page.locator('.container.content');
    const searchInput = contentContainer.locator('input[placeholder="Search"]');

    await searchInput.waitFor({ state: 'visible', timeout: 15000 });
    await searchInput.fill('Physician order form UHI');

    // Locate the exact concept after filtering
    const physicianOrderForm = contentContainer
        .locator('div.concept')
        .filter({
          has: this.page.locator('img[src="assets/icon/note.svg"]')
        })
        .filter({
          hasText: 'Physician order form UHI'
        });
    await expect(physicianOrderForm).toHaveCount(1, { timeout: 15000 });
    await expect(physicianOrderForm).toBeVisible();
    await physicianOrderForm.scrollIntoViewIfNeeded();
    await physicianOrderForm.click();

    console.log('Clicked Physician order form UHI successfully');

    return this;
  }
  async verifyLeadsCountIsGreaterThanOne() {
    await this.patientsCount.waitFor({
      state: 'visible',
      timeout: 15000
    });

    const n = Number((await this.patientsCount.innerText()).trim());
    expect(n).toBeGreaterThanOrEqual(1);
  }
}
