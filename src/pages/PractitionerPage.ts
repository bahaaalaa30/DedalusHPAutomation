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


  private async searchAdditionalIcd11Diagnosis(searchText: string) {
    const diagnosisSearchInput = this.page.locator('#icd11search');
    const icd11DiagnosisCategory = this.page
      .locator('div.directive-linked-title')
      .filter({ hasText: 'ICD11 Diagnosis' });

    // The search panel may remain open after recording the previous diagnosis.
    if (!(await diagnosisSearchInput.isVisible().catch(() => false))) {
      await expect(icd11DiagnosisCategory).toBeVisible({ timeout: 15000 });
      await icd11DiagnosisCategory.click();
    }

    await expect(diagnosisSearchInput).toBeVisible({ timeout: 15000 });
    await diagnosisSearchInput.fill(searchText);
    await diagnosisSearchInput.press('Enter');
  }

  private async completeAdditionalDiagnosisDetails() {
    // Diagnosis Classification (Primary/Secondary) is intentionally not selected
    // for the additional diagnoses. Keep the remaining diagnosis details the same.

    const actualDiagnosisOption = this.page
      .locator('.ui.checkbox')
      .filter({ hasText: /^Actual$/ });
    await expect(actualDiagnosisOption).toBeVisible({ timeout: 15000 });
    await actualDiagnosisOption.locator('input[type="radio"]').check();

    const certainDiagnosisOption = this.page
      .locator('.ui.checkbox')
      .filter({ hasText: /^Certain$/ });
    await expect(certainDiagnosisOption).toBeVisible({ timeout: 15000 });
    await certainDiagnosisOption.locator('input[type="radio"]').check();

    const diagnosisDurationInput = this.page.locator(
      'input.input-field[type="number"][min="1"][max="100"]'
    );
    await expect(diagnosisDurationInput).toBeVisible({ timeout: 15000 });
    await diagnosisDurationInput.fill('4');

    const diagnosisDurationUnit = this.page.locator('select.select-time');
    await expect(diagnosisDurationUnit).toBeVisible({ timeout: 15000 });
    await diagnosisDurationUnit.selectOption('Weeks');

    console.log('Additional diagnosis details completed successfully');
    return this;
  }

  async selectAcuteSTElevationMyocardialInfarctionDiagnosis() {
    await this.searchAdditionalIcd11Diagnosis('Acute ST elevation myocardial infarction');

    const diagnosisResult = this.page
      .locator('div.content')
      .filter({ hasText: 'Acute ST elevation myocardial infarction' })
      .filter({ hasText: 'BA41.0' });

    await expect(diagnosisResult).toHaveCount(1, { timeout: 30000 });
    await expect(diagnosisResult).toBeVisible();
    await diagnosisResult.click();

    console.log('Successfully selected: Acute ST elevation myocardial infarction (BA41.0)');
    return this;
  }

  async completeAcuteSTElevationMyocardialInfarctionDiagnosisDetails() {
    await this.completeAdditionalDiagnosisDetails();
    return this;
  }

  async recordAcuteSTElevationMyocardialInfarctionDiagnosis() {
    const diagnosisAcceptButton = this.page.locator('img[src="assets/new/accept.svg"]');
    await expect(diagnosisAcceptButton).toBeVisible({ timeout: 15000 });
    await diagnosisAcceptButton.click();

    console.log('Acute ST elevation myocardial infarction diagnosis recorded successfully');
    return this;
  }

  async selectGastroparesisDiagnosis() {
    await this.searchAdditionalIcd11Diagnosis('Gastroparesis');

    const diagnosisResult = this.page
      .locator('div.concept-item')
      .filter({
        has: this.page
          .locator('div.content')
          .filter({ hasText: 'Gastroparesis' })
          .filter({ hasText: 'DA41.00' })
      });

    await expect(diagnosisResult).toHaveCount(1, { timeout: 30000 });
    await expect(diagnosisResult).toBeVisible();
    await diagnosisResult.click();

    console.log('Successfully selected: Gastroparesis (DA41.00)');
    return this;
  }

  async completeGastroparesisDiagnosisDetails() {
    await this.completeAdditionalDiagnosisDetails();
    return this;
  }

  async recordGastroparesisDiagnosis() {
    const diagnosisAcceptButton = this.page.locator('img[src="assets/new/accept.svg"]');
    await expect(diagnosisAcceptButton).toBeVisible({ timeout: 15000 });
    await diagnosisAcceptButton.click();

    console.log('Gastroparesis diagnosis recorded successfully');
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

  private async selectAdditionalLabOrder(searchText: string) {
    const labOrderSearchInput = this.page.locator('input[placeholder="Search"]:visible').last();
    await expect(labOrderSearchInput).toBeVisible({ timeout: 15000 });
    await labOrderSearchInput.fill(searchText);
    await labOrderSearchInput.press('Enter');

    const labOrderResult = this.page
      .locator('div.concept-item')
      .filter({
        has: this.page.locator('div.content').filter({ hasText: searchText })
      });

    await expect(labOrderResult).toHaveCount(1, { timeout: 30000 });
    await expect(labOrderResult).toBeVisible();
    await labOrderResult.click();

    console.log(`${searchText} lab order selected successfully`);

    const labOrderAcceptButton = this.page
      .locator('div.save-icn')
      .locator('img[src="assets/new/accept.svg"]');

    await expect(labOrderAcceptButton).toBeVisible({ timeout: 15000 });
    await labOrderAcceptButton.click();

    console.log(`${searchText} lab order completed successfully`);
    return this;
  }

  async selectSerumAlbuminLabOrder() {
    await this.selectAdditionalLabOrder('Serum Albumin');
    return this;
  }

  async selectSerumCreatinineLabOrder() {
    await this.selectAdditionalLabOrder('Serum Creatinine');
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

  private async selectAdditionalRadiologyOrder(searchText: string, facilityName: string) {
    // Radiology Orders remains open after the previous radiology order is recorded.
    const radiologySearchInput = this.page.locator('input[placeholder="Search"]:visible').last();
    await expect(radiologySearchInput).toBeVisible({ timeout: 15000 });
    await radiologySearchInput.fill(searchText);
    await radiologySearchInput.press('Enter');

    const radiologyOrderResult = this.page
      .locator('div.concept-item')
      .filter({
        has: this.page.locator('div.content').getByText(searchText, { exact: true })
      });

    await expect(radiologyOrderResult).toHaveCount(1, { timeout: 30000 });
    await expect(radiologyOrderResult).toBeVisible();
    await radiologyOrderResult.click();

    console.log(`${searchText} radiology order selected`);

    const facilityInput = this.page.locator('.order-form-facility-input input');
    await expect(facilityInput).toBeVisible({ timeout: 15000 });
    await facilityInput.click();

    const facilityList = this.page.locator('.order-facility-list');
    await expect(facilityList).toBeVisible({ timeout: 15000 });

    const facilityOption = facilityList
      .locator('div.order-facility-li')
      .getByText(facilityName, { exact: true });

    await expect(facilityOption).toHaveCount(1, { timeout: 15000 });
    await expect(facilityOption).toBeVisible();
    await facilityOption.click();

    console.log(`Radiology facility selected: ${facilityName}`);

    const radiologyRecordButton = this.page.locator('img[src="assets/new/accept.svg"]:visible').last();
    await expect(radiologyRecordButton).toBeVisible({ timeout: 15000 });
    await radiologyRecordButton.click();

    console.log(`${searchText} radiology order recorded successfully`);
    return this;
  }

  async selectChestXrayOneViewRadiologyOrder() {
    await this.selectAdditionalRadiologyOrder('Chest x-ray. One view', 'El Arab Center - UAT');
    return this;
  }

  async selectCTOfKidneyRadiologyOrder() {
    await this.selectAdditionalRadiologyOrder('CT Of Kidney', 'El Nasr Spl.HospitalForChildren-UAT');
    return this;
  }

  async selectCLOPAM2mgPrescriptionOrder() {
    // Open Prescription Orders in the current consultation screen.
    const clopamPrescriptionOrdersTabLocator = this.page
      .locator('div.consultation-note-icon')
      .filter({
        has: this.page.locator('span.long-name', {
          hasText: /^Prescription Orders$/
        })
      });

    await expect(clopamPrescriptionOrdersTabLocator).toBeVisible({ timeout: 15000 });
    await clopamPrescriptionOrdersTabLocator.click();

    // Search for the exact CLOPAM medication.
    const clopam2mgPrescriptionSearchInput = this.page.locator('#cns-pres-search');
    await expect(clopam2mgPrescriptionSearchInput).toBeVisible({ timeout: 15000 });
    await clopam2mgPrescriptionSearchInput.fill('CLOPAM');
    await clopam2mgPrescriptionSearchInput.press('Enter');

    const clopam2mgPrescriptionResult = this.page
      .locator('div.content.cursor-pointer')
      .filter({
        hasText: /^CLOPAM 2mg Box 30 Tablets \( CLONAZEPAM \)$/
      });
    await expect(clopam2mgPrescriptionResult).toHaveCount(1, { timeout: 30000 });
    await expect(clopam2mgPrescriptionResult).toBeVisible();
    await clopam2mgPrescriptionResult.click();

    console.log('CLOPAM 2mg prescription selected');

    // Select route: BY MOUTH.
    const clopam2mgByMouthOption = this.page
      .locator('.ui.checkbox')
      .filter({ has: this.page.locator('label.check-opt', { hasText: /^BY MOUTH$/ }) });
    await expect(clopam2mgByMouthOption).toBeVisible({ timeout: 15000 });
    await clopam2mgByMouthOption.locator('input[type="radio"]').check();

    // Select frequency: BID - Two Times a Day After Meals.
    const clopam2mgBIDFrequencyOption = this.page
      .locator('.ui.checkbox')
      .filter({
        has: this.page.locator('label.check-opt', {
          hasText: /^BID- Two Times a Day After Meals$/
        })
      });
    await expect(clopam2mgBIDFrequencyOption).toBeVisible({ timeout: 15000 });
    await clopam2mgBIDFrequencyOption.locator('input[type="radio"]').check();

    // Enter the prescription instruction.
    const clopam2mgInstructionInput = this.page.locator('input[placeholder="Enter"]:visible').last();
    await expect(clopam2mgInstructionInput).toBeVisible({ timeout: 15000 });
    await clopam2mgInstructionInput.fill('test');

    // Scroll the document and every vertically scrollable prescription panel to the bottom.
    await this.page.evaluate(() => {
      const scrollToBottom = (element: HTMLElement) => {
        element.scrollTop = element.scrollHeight;
      };

      const documentScroller = document.scrollingElement as HTMLElement | null;
      if (documentScroller) {
        scrollToBottom(documentScroller);
      }
      window.scrollTo(0, document.documentElement.scrollHeight);

      const scrollableElements = Array.from(
        document.querySelectorAll<HTMLElement>('*')
      ).filter((element) => {
        const styles = window.getComputedStyle(element);
        return (
          element.scrollHeight > element.clientHeight &&
          ['auto', 'scroll', 'overlay', 'hidden'].includes(styles.overflowY)
        );
      });

      for (const element of scrollableElements) {
        scrollToBottom(element);
      }
    });

    // Match the duration label while tolerating whitespace around "1 W".
    const clopam2mgDurationOption = this.page
      .locator('span.check')
      .filter({ hasText: /^\s*1\s+W\s*$/ });

    // Wait for the duration option to be rendered after scrolling.
    await expect(clopam2mgDurationOption).toHaveCount(1, { timeout: 30000 });
    await expect(clopam2mgDurationOption).toBeVisible({ timeout: 15000 });
    await clopam2mgDurationOption.locator('input[type="radio"]').check();

    // Return the page and its scrollable prescription containers to the top.
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);

      const scrollableElements = Array.from(
        document.querySelectorAll<HTMLElement>('*')
      ).filter((element) => {
        const styles = window.getComputedStyle(element);
        return (
          element.scrollHeight > element.clientHeight &&
          ['auto', 'scroll'].includes(styles.overflowY)
        );
      });

      for (const element of scrollableElements) {
        element.scrollTop = 0;
      }
    });

    // Save the CLOPAM prescription.
    const clopam2mgPrescriptionAcceptButton = this.page
      .locator('img[src="assets/new/accept.svg"]:visible')
      .last();
    await expect(clopam2mgPrescriptionAcceptButton).toBeVisible({ timeout: 15000 });
    await clopam2mgPrescriptionAcceptButton.click();

    console.log('CLOPAM 2mg prescription details saved successfully');

    return this;
  }

  private async selectAdditionalPrescriptionOrder(searchText: string, exactResultText: string) {
    // Prescription Orders may remain open after recording the previous medication.
    const prescriptionSearchInput = this.page.locator('#cns-pres-search');

    if (!(await prescriptionSearchInput.isVisible().catch(() => false))) {
      const prescriptionOrdersTabLocator = this.page
        .locator('div.consultation-note-icon')
        .filter({
          has: this.page.locator('span.long-name', {
            hasText: /^Prescription Orders$/
          })
        });

      await expect(prescriptionOrdersTabLocator).toBeVisible({ timeout: 15000 });
      await prescriptionOrdersTabLocator.click();
    }

    await expect(prescriptionSearchInput).toBeVisible({ timeout: 15000 });
    await prescriptionSearchInput.fill(searchText);
    await prescriptionSearchInput.press('Enter');

    const prescriptionResult = this.page
      .locator('div.content.cursor-pointer')
      .filter({ hasText: exactResultText });

    await expect(prescriptionResult).toHaveCount(1, { timeout: 30000 });
    await expect(prescriptionResult).toBeVisible();
    await prescriptionResult.click();

    console.log(`${exactResultText} prescription selected successfully`);
    return this;
  }

  async selectParacetamol500mgPrescriptionOrder() {
    await this.selectAdditionalPrescriptionOrder(
      'PARACETAMOL 500MG',
      'PARACETAMOL 500MG TABLET ( PARACETAMOL )'
    );
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
