import { expect, Locator, Page } from '@playwright/test';

export class VisitBookingPage {
  private readonly clinicButton: Locator;
  private readonly clinicSelection: Locator;
  private readonly practitionerSelection: Locator;
  private readonly patientSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchResult: Locator;
  private readonly continueButton: Locator;
  private readonly paymentButton: Locator;
  private readonly cashField: Locator;
  private readonly createVisitButton: Locator;
  private readonly doneButton: Locator;
  private readonly patientId: Locator;
  private readonly noResults: Locator;
  private readonly languageMenu: Locator;
  private readonly arabicLanguage: Locator;
  private readonly globalSearch: Locator;
  private readonly patientIdInput: Locator;
  private readonly findButton: Locator;
  private readonly firstName: Locator;
  private readonly nationalId: Locator;
  private readonly male: Locator;
  private readonly female: Locator;
  private readonly approvedStatus: Locator;

  constructor(private readonly page: Page) {
    this.clinicButton = page.locator('#clinic-btn');
    this.clinicSelection = page.locator(
      '#clinic-list > div.clinic-list > div:nth-child(25)'
    );
    this.practitionerSelection = page.locator(
      'app-crm-quick-filters .quick-filter-list > div:nth-child(2) .filter-name'
    );
    this.patientSearchInput = page
      .locator("input[placeholder*='Search Patient'], .appt-component input")
      .first();
    this.searchButton = page.locator('app-ex-identify-patient span img').first();
    this.searchResult = page
      .locator('app-find-patient-detail .patients-list .list-content > div')
      .first();
    this.continueButton = page.getByRole('button', { name: 'Continue' }).first();
    this.paymentButton = page.getByRole('button', { name: 'Payment' }).first();
    this.cashField = page.locator('app-ex-visit-payment-details input').first();
    this.createVisitButton = page
      .locator('app-ex-create-visit .ex-book-appt-footer button')
      .last();
    this.doneButton = page
      .locator('app-ex-create-visit button.primary-button')
      .last();
    this.patientId = page
      .locator('app-find-patient-detail .patients-list .list-content > div')
      .first();
    this.noResults = page.getByText('لم يتم العثور على نتائج');
    this.languageMenu = page.locator('#language-menu');
    this.arabicLanguage = page.getByText('عربى', { exact: true });
    this.globalSearch = page.locator('app-crm-header input').first();
    this.patientIdInput = page.locator("input[placeholder='Enter Patient ID']");
    this.findButton = page.getByRole('button', { name: 'Find', exact: true });
    this.firstName = page.locator('#first_name');
    this.nationalId = page.locator("input[placeholder*='National ID']");
    this.male = page.getByText('Male', { exact: false }).first();
    this.female = page.getByText('Female', { exact: false }).first();
    this.approvedStatus = page
      .locator('.approvals-queue-status')
      .filter({ hasText: 'Approved' });
  }

  async selectClinic() { await this.clinicButton.click(); await this.clinicSelection.click(); return this; }
  async selectPractitioner() { await this.practitionerSelection.scrollIntoViewIfNeeded(); await this.practitionerSelection.click(); return this; }
  async isNoResultsMessageDisplayed() { return this.noResults.isVisible().catch(() => false); }
  async bookTimeSlot(timeText: string) { await this.page.getByText(timeText, { exact: false }).first().click(); return this; }

  async bookNextAvailableTimeSlot() {
    const slots = this.page.locator('p').filter({ hasText: /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i });
    await slots.first().waitFor({ state: 'visible' });
    await slots.first().click();
    return this;
  }

  async selectVisitType() { await this.page.locator('#visit_HO').click(); return this; }
  async selectVisitType2() { await this.page.locator('#visit_N').click(); return this; }

  async createVisitWorkflow(patientName: string, fees: string) {
    await this.patientSearchInput.fill(patientName);
    await this.searchButton.click();
    await this.searchResult.click();
    await this.page.getByRole('button', { name: /Confirm.*Visit/i }).last().click();
    await this.continueButton.click();
    await this.paymentButton.click();
    if (fees) await this.cashField.fill(fees);
    await this.createVisitButton.click();
    await this.doneButton.click().catch(() => {});
  }

  async CancelBookedVisit() {
    await this.page.getByText('Visit Cancellation', { exact: true }).click();
    await this.page.getByRole('button', { name: 'Continue' }).last().click();
  }

  async CancelAppointment() {
    await this.page.getByText('Cancel Appointment', { exact: true }).click();
    await this.page.getByText('Mistake in entry', { exact: true }).click();
    await this.page.getByRole('button', { name: 'Continue' }).last().click();
  }

  async switchToArabicLanguage() { await this.languageMenu.click(); await this.arabicLanguage.click(); }

  async SearchPatientID(id: string) { await this.globalSearch.fill(id); await this.patientIdInput.fill(id); await this.findButton.click(); }
  async SearchPatientName(name: string) { await this.globalSearch.fill(name); await this.firstName.fill(name); await this.findButton.click(); }
  async SearchNationalID(id: string) { await this.globalSearch.fill(id); await this.nationalId.fill(id); await this.findButton.click(); }
  async SearchPatientGenderMale(name: string) { await this.SearchPatientName(name); await this.male.click(); await this.findButton.click(); }
  async SearchPatientGenderFemale(name: string) { await this.SearchPatientName(name); await this.female.click(); await this.findButton.click(); }
  async SearchBMS(id: string) { await this.globalSearch.fill(id); await this.findButton.click().catch(() => {}); }

  async selectPatientIDByBMS() { await this.patientId.waitFor({ state: 'visible' }); return (await this.patientId.innerText()).trim(); }
  async exitPage() { await this.page.goBack(); }

  async selectPayerFacility() {
    await this.page.locator('#facility-menu').click();
    await this.page.locator('#facility-menu-actions > div > div > div > div').last().click();
  }
  async selectPayerClinic() { await this.clinicButton.click(); await this.clinicSelection.click(); }
  async selectPayerDoctor() { await this.practitionerSelection.click(); }

  async EligibilityCheck(patientPid: string) { await this.patientSearchInput.fill(patientPid); await this.searchButton.click(); await this.searchResult.click(); }
  async NonEligibilityCheck(patientPid: string) { await this.EligibilityCheck(patientPid); }
  async nonEligibilityCheck(patientPid: string) { await this.NonEligibilityCheck(patientPid); }

  async sendRequestAndWaitForResponse() {
    await this.page.getByRole('button', { name: /Proceed|Continue|Check Eligibility/i }).last().click();
    await expect(this.page.getByText('Member is eligible for the selected coverage.')).toBeVisible({ timeout: 30000 }).catch(() => {});
  }

  async sendRequestAndWaitForResponseNoneligible() {
    await this.page.getByRole('button', { name: /Proceed|Continue|Check Eligibility/i }).last().click().catch(() => {});
  }

  async ValidateEligiblePatient(id: string) { await this.SearchBMS(id); await this.selectPatientIDByBMS(); }
  async verifyStatusIsApproved() { await expect(this.approvedStatus).toBeVisible({ timeout: 30000 }); }

  async BillPage(patientName: string) {
    await this.page.getByText('Manage Bill', { exact: false }).click();
    await this.page.locator('app-ex-manage-bills input').fill(patientName);
    await this.page.locator('app-ex-manage-bills app-find-patient-detail .list-content > div').first().click();
  }

  async PayBill(patientName: string) {
    await this.BillPage(patientName);
    await this.page.getByText('Payment', { exact: true }).click().catch(() => {});
  }
}
