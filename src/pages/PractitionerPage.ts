import { expect, Locator, Page } from '@playwright/test';

export class PractitionerPage {
  private readonly patientsCountLocator: Locator;
  private readonly clinicFacilityMenuLocator: Locator;
  private readonly clinicFacilityOptionLocator: Locator;
  private readonly practitionerFilterLocator: Locator;
  private readonly firstPatientLocator: Locator;
  private readonly newDocumentButtonLocator: Locator;
  private readonly startConsultationButtonLocator: Locator;
  private readonly clinicianRoleRadioLocator: Locator;
  private readonly continueRoleButtonLocator: Locator;

  constructor(private readonly page: Page) {
    this.patientsCountLocator = page.locator(
      'xpath=/html/body/app-root/app-crm/div/div/app-crm-leads/div[2]/div/div[1]/app-crm-quick-filters/div/div/div[2]/div[2]/div[3]/div'
    );
    this.clinicFacilityMenuLocator = page.locator('#facility-menu');
    this.clinicianRoleRadioLocator = page.locator('#role_clinic');
    this.continueRoleButtonLocator = page.getByRole('button', {
      name: 'Continue',
      exact: true
    });
    this.clinicFacilityOptionLocator = page.locator(
      '#facility-menu-actions > div > div > div > div > div:nth-child(3)'
    );
    this.practitionerFilterLocator = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > div > div.diary-container > div.quick-filters > app-crm-quick-filters > div > div > div.quick-filter-list.ng-star-inserted > div:nth-child(2) > div.filter-name.has-count.no-icon'
    );
    this.firstPatientLocator = page
      .locator('div.col-patient div.patient-name > p.no-margin')
      .first();
    this.newDocumentButtonLocator = page.locator('div.new-actions.pointer');
    this.startConsultationButtonLocator = page.locator(
      'div.start-consult-dialog button.primary-button'
    );
  }

  async continueRole() {
    await expect(this.continueRoleButtonLocator).toBeEnabled({
      timeout: 10000
    });
    await this.continueRoleButtonLocator.click();
    return this;
  }

  async selectRole() {
    await this.clinicianRoleRadioLocator.waitFor({
      state: 'visible',
      timeout: 15000
    });
    await this.clinicianRoleRadioLocator.check();
    await expect(this.clinicianRoleRadioLocator).toBeChecked();
    return this;
  }

  async selectClinic() {
    await this.clinicFacilityMenuLocator.waitFor({ state: 'visible', timeout: 15000 });
    await this.clinicFacilityMenuLocator.click();
    await this.clinicFacilityOptionLocator.waitFor({ state: 'visible', timeout: 15000 });
    await this.clinicFacilityOptionLocator.click();
    return this;
  }

  async selectPractitioner() {
    await this.practitionerFilterLocator.waitFor({
      state: 'visible',
      timeout: 15000
    });
    await this.practitionerFilterLocator.scrollIntoViewIfNeeded();
    await this.practitionerFilterLocator.click();
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
    await this.startConsultationButtonLocator.waitFor({
      state: 'visible',
      timeout: 15000
    });
    await this.startConsultationButtonLocator.click();
    return this;
  }

  async selectPhysicianOrderFormUHI() {
    await this.newDocumentButtonLocator.waitFor({ state: 'visible', timeout: 15000 });
    await this.newDocumentButtonLocator.click();

    const physicianOrderFormContentContainer = this.page.locator('.container.content');
    const physicianOrderFormSearchInput = physicianOrderFormContentContainer.locator('input[placeholder="Search"]');

    await physicianOrderFormSearchInput.waitFor({ state: 'visible', timeout: 15000 });
    await physicianOrderFormSearchInput.fill('Physician order form UHI');

    // Locate the exact concept after filtering
    const physicianOrderFormResult = physicianOrderFormContentContainer
        .locator('div.concept')
        .filter({
          has: this.page.locator('img[src="assets/icon/note.svg"]')
        })
        .filter({
          hasText: 'Physician order form UHI'
        });
    await expect(physicianOrderFormResult).toHaveCount(1, { timeout: 15000 });
    await expect(physicianOrderFormResult).toBeVisible();
    await physicianOrderFormResult.scrollIntoViewIfNeeded();
    await physicianOrderFormResult.click();

    console.log('Clicked Physician order form UHI successfully');

    return this;
  }
  async verifyLeadsCountIsGreaterThanOne() {
    await this.patientsCountLocator.waitFor({
      state: 'visible',
      timeout: 15000
    });

    const n = Number((await this.patientsCountLocator.innerText()).trim());
    expect(n).toBeGreaterThanOrEqual(1);
  }

  async selectAcuteHeadacheDiagnosis() {
    const icd11DiagnosisCategoryLocator = this.page.locator(
        'div.directive-linked-title'
    ).filter({
      hasText: 'ICD11 Diagnosis'
    });
    await expect(icd11DiagnosisCategoryLocator).toBeVisible({ timeout: 30000 });
    await icd11DiagnosisCategoryLocator.click();
    const acuteHeadacheDiagnosisSearchInput = this.page.locator('#icd11search');
    await expect(acuteHeadacheDiagnosisSearchInput).toBeVisible({ timeout: 30000 });
    await acuteHeadacheDiagnosisSearchInput.fill('Acute headache');
    await acuteHeadacheDiagnosisSearchInput.press('Enter');
    const acuteHeadacheDiagnosisResult = this.page.locator('div.content')
        .filter({
          hasText: 'Acute headache, not elsewhere classified'
        })
        .filter({
          hasText: 'MG31.1'
        });
    await expect(acuteHeadacheDiagnosisResult).toBeVisible({ timeout: 30000 });
    await acuteHeadacheDiagnosisResult.click();
    console.log('Successfully selected: Acute headache (MG31.1)');
    return this;
  }
  async completeAcuteHeadacheDiagnosisDetails() {

    // 1. Select Primary
    const primaryDiagnosisOption = this.page
        .locator('.ui.checkbox')
        .filter({ hasText: /^Primary$/ });

    await expect(primaryDiagnosisOption).toBeVisible({ timeout: 15000 });
    await primaryDiagnosisOption.locator('input[type="radio"]').check();

    // 2. Select Actual
    const actualDiagnosisOption = this.page
        .locator('.ui.checkbox')
        .filter({ hasText: /^Actual$/ });

    await expect(actualDiagnosisOption).toBeVisible();
    await actualDiagnosisOption.locator('input[type="radio"]').check();

    // 3. Select Certain
    const certainDiagnosisOption = this.page
        .locator('.ui.checkbox')
        .filter({ hasText: /^Certain$/ });

    await expect(certainDiagnosisOption).toBeVisible();
    await certainDiagnosisOption.locator('input[type="radio"]').check();

    // 4. Enter duration value
    const acuteHeadacheDurationInput = this.page.locator(
        'input.input-field[type="number"][min="1"][max="100"]'
    );

    await expect(acuteHeadacheDurationInput).toBeVisible();
    await acuteHeadacheDurationInput.fill('4');

    // 5. Select Weeks
    const acuteHeadacheDurationUnitSelect = this.page.locator('select.select-time');

    await expect(acuteHeadacheDurationUnitSelect).toBeVisible();
    await acuteHeadacheDurationUnitSelect.selectOption('Weeks');

    console.log('Diagnosis details completed successfully');

    return this;
  }

  async recordAcuteHeadacheDiagnosis() {
    const diagnosisAcceptButton = this.page.locator(
        'img[src="assets/new/accept.svg"]'
    );

    await expect(diagnosisAcceptButton).toBeVisible({ timeout: 15000 });
    await diagnosisAcceptButton.click();

    console.log('Diagnosis recorded successfully');

    return this;
  }

  async selectCBCLabOrder() {
    // Open the Lab Orders section without leaving the consultation screen.
    const labOrdersTabLocator = this.page
      .locator('div.consultation-note-icon')
      .filter({ has: this.page.locator('span.long-name', { hasText: /^Lab Orders$/ }) });

    await expect(labOrdersTabLocator).toBeVisible({ timeout: 15000 });
    await labOrdersTabLocator.click();

    // Search for CBC using the same flow as diagnosis search.
    const cbcLabOrderSearchInput = this.page.locator('input[placeholder="Search"]:visible').last();
    await expect(cbcLabOrderSearchInput).toBeVisible({ timeout: 15000 });
    await cbcLabOrderSearchInput.fill('CBC');
    await cbcLabOrderSearchInput.press('Enter');

    // getByText exact matching normalizes leading/trailing whitespace.
    const cbcLabOrderResult = this.page.getByText('CBC', { exact: true }).last();
    await expect(cbcLabOrderResult).toBeVisible({ timeout: 30000 });
    await cbcLabOrderResult.click();

    console.log('CBC lab order selected successfully');

    // Confirm the selected lab order using its accept icon.
    const cbcLabOrderAcceptButton = this.page
      .locator('div.save-icn')
      .locator('img[src="assets/new/accept.svg"]');

    await expect(cbcLabOrderAcceptButton).toBeVisible({ timeout: 15000 });
    await cbcLabOrderAcceptButton.click();

    console.log('CBC lab order completed successfully');

    return this;
  }
  async selectCTOfLarynxRadiologyOrder() {
    // Open Radiology Orders in the current consultation screen.
    const radiologyOrdersTabLocator = this.page
      .locator('div.consultation-note-icon')
      .filter({ has: this.page.locator('span.long-name', { hasText: /^Radiology Orders$/ }) });

    await expect(radiologyOrdersTabLocator).toBeVisible({ timeout: 15000 });
    await radiologyOrdersTabLocator.click();

    // Search for CT of larynx using the same flow as Lab Orders.
    const ctOfLarynxSearchInput = this.page.locator('input[placeholder="Search"]:visible').last();
    await expect(ctOfLarynxSearchInput).toBeVisible({ timeout: 15000 });
    await ctOfLarynxSearchInput.fill('CT of larynx');
    await ctOfLarynxSearchInput.press('Enter');

    const ctOfLarynxRadiologyResult = this.page.getByText('CT of larynx', { exact: true }).last();
    await expect(ctOfLarynxRadiologyResult).toBeVisible({ timeout: 30000 });
    await ctOfLarynxRadiologyResult.click();

    console.log('CT of larynx radiology order selected');

    // Open the facility list and choose El Nasr Spl.HospitalForChildren-UAT.
    const radiologyFacilitySearchInput = this.page.locator('.order-form-facility-input input');
    await expect(radiologyFacilitySearchInput).toBeVisible({ timeout: 15000 });
    await radiologyFacilitySearchInput.click();

    const radiologyFacilityList = this.page.locator('.order-facility-list');
    await expect(radiologyFacilityList).toBeVisible({ timeout: 15000 });

    // Select the facility by its exact visible name, regardless of its position.
    const elNasrRadiologyFacilityOption = radiologyFacilityList.getByText('El Nasr Spl.HospitalForChildren-UAT', { exact: true });
    await expect(elNasrRadiologyFacilityOption).toBeVisible({ timeout: 15000 });
    await expect(elNasrRadiologyFacilityOption).toHaveCount(1);
    await elNasrRadiologyFacilityOption.click();

    console.log('Radiology facility selected: El Nasr Spl.HospitalForChildren-UAT');

    // Confirm the radiology order using its accept icon.
    const ctOfLarynxRadiologyAcceptButton = this.page.locator('img[src="assets/new/accept.svg"]:visible').last();
    await expect(ctOfLarynxRadiologyAcceptButton).toBeVisible({ timeout: 15000 });
    await ctOfLarynxRadiologyAcceptButton.click();

    console.log('CT of larynx radiology order completed successfully');

    return this;
  }

  async submitPredeterminationOrdersToPayer() {
    // Close the completed orders screen.
    const predeterminationOrdersCloseButton = this.page.getByRole('button', {
      name: 'Close',
      exact: true
    });
    await expect(predeterminationOrdersCloseButton).toBeVisible({ timeout: 15000 });
    await predeterminationOrdersCloseButton.click();

    console.log('Predetermination orders screen closed');

    // Submit the predetermination order to the payer.
    const submitPredeterminationToPayerButton = this.page.getByRole('button', {
      name: 'Submit',
      exact: true
    });
    await expect(submitPredeterminationToPayerButton).toBeVisible({ timeout: 15000 });
    await submitPredeterminationToPayerButton.click();

    console.log('Predetermination order submitted to payer');

    return this;
  }

}
