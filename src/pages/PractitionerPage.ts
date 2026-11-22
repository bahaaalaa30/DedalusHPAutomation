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

  async chooseDiagnoseMethod() {
    const icd11Diagnosis = this.page.locator(
        'div.directive-linked-title'
    ).filter({
      hasText: 'ICD11 Diagnosis'
    });
    await expect(icd11Diagnosis).toBeVisible({ timeout: 30000 });
    await icd11Diagnosis.click();
    const diagnosisSearch = this.page.locator('#icd11search');
    await expect(diagnosisSearch).toBeVisible({ timeout: 30000 });
    await diagnosisSearch.fill('Acute headache');
    await diagnosisSearch.press('Enter');
    const diagnosisResult = this.page.locator('div.content')
        .filter({
          hasText: 'Acute headache, not elsewhere classified'
        })
        .filter({
          hasText: 'MG31.1'
        });
    await expect(diagnosisResult).toBeVisible({ timeout: 30000 });
    await diagnosisResult.click();
    console.log('Successfully selected: Acute headache (MG31.1)');
    return this;
  }
  async completeDiagnosisDetails() {

    // 1. Select Primary
    const primaryOption = this.page
        .locator('.ui.checkbox')
        .filter({ hasText: /^Primary$/ });

    await expect(primaryOption).toBeVisible({ timeout: 15000 });
    await primaryOption.locator('input[type="radio"]').check();

    // 2. Select Actual
    const actualOption = this.page
        .locator('.ui.checkbox')
        .filter({ hasText: /^Actual$/ });

    await expect(actualOption).toBeVisible();
    await actualOption.locator('input[type="radio"]').check();

    // 3. Select Certain
    const certainOption = this.page
        .locator('.ui.checkbox')
        .filter({ hasText: /^Certain$/ });

    await expect(certainOption).toBeVisible();
    await certainOption.locator('input[type="radio"]').check();

    // 4. Enter duration value
    const durationInput = this.page.locator(
        'input.input-field[type="number"][min="1"][max="100"]'
    );

    await expect(durationInput).toBeVisible();
    await durationInput.fill('4');

    // 5. Select Weeks
    const durationUnit = this.page.locator('select.select-time');

    await expect(durationUnit).toBeVisible();
    await durationUnit.selectOption('Weeks');

    console.log('Diagnosis details completed successfully');

    return this;
  }

  async recordDiagnosis() {
    const acceptButton = this.page.locator(
        'img[src="assets/new/accept.svg"]'
    );

    await expect(acceptButton).toBeVisible({ timeout: 15000 });
    await acceptButton.click();

    console.log('Diagnosis recorded successfully');

    return this;
  }

  async selectLabOrder() {
    // Open the Lab Orders section without leaving the consultation screen.
    const labOrdersTab = this.page
      .locator('div.consultation-note-icon')
      .filter({ has: this.page.locator('span.long-name', { hasText: /^Lab Orders$/ }) });

    await expect(labOrdersTab).toBeVisible({ timeout: 15000 });
    await labOrdersTab.click();

    // Search for CBC using the same flow as diagnosis search.
    const searchInput = this.page.locator('input[placeholder="Search"]:visible').last();
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await searchInput.fill('CBC');
    await searchInput.press('Enter');

    // getByText exact matching normalizes leading/trailing whitespace.
    const cbcResult = this.page.getByText('CBC', { exact: true }).last();
    await expect(cbcResult).toBeVisible({ timeout: 30000 });
    await cbcResult.click();

    console.log('CBC lab order selected successfully');

    // Confirm the selected lab order using its accept icon.
    const completeButton = this.page
      .locator('div.save-icn')
      .locator('img[src="assets/new/accept.svg"]');

    await expect(completeButton).toBeVisible({ timeout: 15000 });
    await completeButton.click();

    console.log('CBC lab order completed successfully');

    return this;
  }
  async selectRadiologyOrder() {
    // Open Radiology Orders in the current consultation screen.
    const radiologyOrdersTab = this.page
      .locator('div.consultation-note-icon')
      .filter({ has: this.page.locator('span.long-name', { hasText: /^Radiology Orders$/ }) });

    await expect(radiologyOrdersTab).toBeVisible({ timeout: 15000 });
    await radiologyOrdersTab.click();

    // Search for CT of larynx using the same flow as Lab Orders.
    const searchInput = this.page.locator('input[placeholder="Search"]:visible').last();
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await searchInput.fill('CT of larynx');
    await searchInput.press('Enter');

    const radiologyResult = this.page.getByText('CT of larynx', { exact: true }).last();
    await expect(radiologyResult).toBeVisible({ timeout: 30000 });
    await radiologyResult.click();

    console.log('CT of larynx radiology order selected');

    // Open the facility list and choose El Nasr Spl.HospitalForChildren-UAT.
    const facilityInput = this.page.locator('.order-form-facility-input input');
    await expect(facilityInput).toBeVisible({ timeout: 15000 });
    await facilityInput.click();

    const facilityList = this.page.locator('.order-facility-list');
    await expect(facilityList).toBeVisible({ timeout: 15000 });

    // El Nasr Spl.HospitalForChildren-UAT is the second item in this list.
    const facility = facilityList.locator('.order-facility-li').nth(1);
    await expect(facility).toHaveText('El Nasr Spl.HospitalForChildren-UAT', { timeout: 15000 });
    await facility.click();

    console.log('Radiology facility selected: El Nasr Spl.HospitalForChildren-UAT');

    // Confirm the radiology order using its accept icon.
    const acceptButton = this.page.locator('img[src="assets/new/accept.svg"]:visible').last();
    await expect(acceptButton).toBeVisible({ timeout: 15000 });
    await acceptButton.click();

    console.log('CT of larynx radiology order completed successfully');

    return this;
  }

}
