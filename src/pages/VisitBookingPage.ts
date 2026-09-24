import { expect, Locator, Page } from '@playwright/test';

export class VisitBookingPage {
  private readonly clinicButton: Locator;
  private readonly clinicSelection: Locator;
  private readonly practitionerSelection: Locator;
  private readonly patientSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly visitTypeOHC: Locator;
  private readonly visitTypeHO: Locator;
  private readonly payerVisitType2: Locator;
  private readonly studentVisitType: Locator;
  private readonly annualCheckVisitType: Locator;
  private readonly searchResult: Locator;
  private readonly confirmAppointmentAndCreateVisit: Locator;
  private readonly continueToVisit: Locator;
  private readonly paymentButton: Locator;
  private readonly cashField: Locator;
  private readonly createVisitButton: Locator;
  private readonly doneButton: Locator;
  private readonly previewAppointment: Locator;
  private readonly cancelVisitPatient: Locator;
  private readonly appointmentCancelReason: Locator;
  private readonly cancelAppointment: Locator;
  private readonly wrongEntryRadio: Locator;
  private readonly continueAppointmentCancellation: Locator;
  private readonly continueVisitCancellation: Locator;
  private readonly languageMenu: Locator;
  private readonly arabicLanguage: Locator;
  private readonly onlineEligibilityButton: Locator;
  private readonly eligibilityFailureModal: Locator;
  private readonly eligibilityFailureProceedButton: Locator;
  private readonly proceedWithCashButton: Locator;
  private readonly noResults: Locator;
  private readonly globalSearch: Locator;
  private readonly patientIdInput: Locator;
  private readonly findButton: Locator;
  private readonly firstName: Locator;
  private readonly nationalId: Locator;
  private readonly male: Locator;
  private readonly female: Locator;
  private readonly eligibilitySuccessMessage: Locator;
  private readonly proceedRegistrationButton: Locator;
  private readonly patientList: Locator;
  private readonly actionsButton: Locator;
  private readonly manageBillButton: Locator;
  private readonly searchBillPatient: Locator;
  private readonly findBillButton: Locator;
  private readonly searchPatientList: Locator;
  private readonly chooseVisitForBill: Locator;
  private readonly printBillButton: Locator;
  private readonly printButton: Locator;
  private readonly closeButton: Locator;
  private readonly paymentBillButton: Locator;
  private readonly payBillButton: Locator;

  constructor(private readonly page: Page) {
    this.clinicButton = page.locator('#clinic-btn');
    this.clinicSelection = page.locator(
      '#clinic-list > div.clinic-list > div:nth-child(25)'
    );
    this.practitionerSelection = page.getByText('El Nasr Doctor', {
      exact: true
    });
    this.patientSearchInput = page
      .locator("input[placeholder*='Search Patient'], .appt-component input")
      .first();
    this.searchButton = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-book-appointment > div.ex-book-appointment-container > div.ex-book-appointment > div > div.book-appt-container > div.appt-container.border-left > div.appt-component > div > app-ex-identify-patient > div > div.content > div > div > span > img'
    );
    this.visitTypeOHC = page.getByRole('radio', {
      name: 'Annual Check Up'
    });
    this.visitTypeHO = page.getByRole('radio', {
      name: 'New'
    });
    this.payerVisitType2 = page.locator('#visit_N');
    this.studentVisitType = page.locator('#visit_SC');
    this.annualCheckVisitType = page.locator('#visit_GC');
    this.searchResult = page
      .locator('.patients-list .list-content > div')
      .first();
    this.confirmAppointmentAndCreateVisit = page
      .locator('app-ex-book-appointment .book-appt-footer button')
      .last();
    this.continueToVisit = page.locator(
      'app-ex-identify-patient .patientWarning .continue-button'
    );
    this.paymentButton = page.locator(
      "//button[contains(text(),'Payment')]"
    );
    this.cashField = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-create-visit > div > div.ex-book-appointment > div > div.book-appt-container > div.appt-container.border-left > div.appt-component > div > app-ex-visit-payment-details > div > div.payment-container > div.flex_container > div > div > input'
    );
    this.createVisitButton = page
      .locator('app-ex-create-visit .book-appt-footer button')
      .last();
    this.doneButton = page.getByRole('button', {
      name: 'Done',
      exact: true
    });
    this.previewAppointment = page.locator(
      "//span[@class='patient-name' and contains(text(),'Visit Cancellation For automation')]"
    );
    this.cancelVisitPatient = page.locator(
      "//div[normalize-space()='Visit Cancellation']"
    );
    this.appointmentCancelReason = page.locator(
      "//label[contains(text(), 'Mistake in entry')]"
    );
    this.cancelAppointment = page.locator(
      "//div[normalize-space()='Cancel Appointment']"
    );
    this.wrongEntryRadio = page.locator(
      "//label[normalize-space()='Wrong Entry']"
    );
    this.continueAppointmentCancellation = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-cancel-appointment > div > div.ex-cancel-appointment > div > div.cancel-appt-footer.border-top > button'
    );
    this.continueVisitCancellation = page.locator(
      "//button[contains(@class, 'primary-button') and normalize-space()='Continue']"
    );
    this.languageMenu = page.locator('#language-menu');
    this.arabicLanguage = page.locator(
      "//div[normalize-space()='عربى']"
    );
    this.onlineEligibilityButton = page.getByRole('button', {
      name: 'Online eligibility',
      exact: true
    });
    this.eligibilityFailureModal = page.locator(
      'app-alert-modal .alert-content'
    );
    this.eligibilityFailureProceedButton = page
      .locator('app-alert-modal .footer button')
      .last();
    this.proceedWithCashButton = page.getByRole('button', {
      name: 'Proceed with cash',
      exact: true
    });
    this.noResults = page.locator(
      "//div[contains(@class, 'title') and normalize-space()='لم يتم العثور على نتائج']"
    );
    this.globalSearch = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-crm-header > div > div > div.col-5.custom-head-col > input'
    );
    this.patientIdInput = page.locator(
      "input[placeholder='Enter Patient ID']"
    );
    this.findButton = page.locator("//button[text()='Find']");
    this.firstName = page.locator('#first_name');
    this.nationalId = page.locator(
      "input[placeholder*='National ID']"
    );
    this.male = page.locator("//label[contains(., 'Male')]");
    this.female = page.locator("//label[contains(.,'Female')]");
    this.eligibilitySuccessMessage = page.getByText(
      'Member is eligible for the selected coverage.',
      { exact: true }
    );
    this.proceedRegistrationButton = page.getByRole('button', {
      name: 'Continue',
      exact: true
    });
    this.patientList = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > div.find-patient.ng-tns-c29-4.ng-star-inserted > app-find-patient-detail > div > div > app-flash-card > div > div > div.front > div > div > div.find-patient-content > div.patients-list.border-left > div.list-content > div'
    );
    this.actionsButton = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > div > div.diary-header.border-bottom > div.diary-header-content > div > div.btn-actn.cursor-pointer'
    );
    this.manageBillButton = page
      .locator('body > app-root > app-crm > app-crm-forms-list')
      .first();
    this.searchBillPatient = page
      .locator(
        'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills input'
      )
      .first();
    this.findBillButton = page
      .locator(
        'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills span'
      )
      .first();
    this.searchPatientList = page
      .locator(
        'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills .patients-list .list-content > div'
      )
      .first();
    this.chooseVisitForBill = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills table tbody tr:nth-child(6) td:nth-child(2)'
    );
    this.printBillButton = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills table tbody tr:nth-child(2) td:nth-child(7) img:nth-child(2)'
    );
    this.printButton = page.locator('cr-button.action-button');
    this.closeButton = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills .book-appt-header > div'
    );
    this.paymentBillButton = page
      .locator(
        'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills .book-appt-footer button'
      )
      .last();
    this.payBillButton = page.locator(
      'body > app-root > app-crm > div > div > app-clinical-diary > app-ex-manage-bills table tbody tr:nth-child(1) td:nth-child(7) img:nth-child(1)'
    );
  }

  private async click(locator: Locator, timeout = 20000) {
    await locator.click({ timeout });
  }

  private async fill(locator: Locator, value: string, timeout = 20000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }

  async selectClinic() {
    await this.click(this.clinicButton);
    await this.click(this.clinicSelection);
    return this;
  }

  async selectPractitioner() {
    await this.click(this.practitionerSelection);
    return this;
  }

  async isNoResultsMessageDisplayed() {
    try {
      await this.noResults.waitFor({
        state: 'visible',
        timeout: 10000
      });
      return true;
    } catch {
      return false;
    }
  }

  async bookTimeSlot(timeText: string) {
    console.log(\`⏰ Selecting time slot: \${timeText}\`);

    const slot = this.page.locator(
      \`//p[contains(text(),'\${timeText}')]/parent::div\`
    );

    await slot.waitFor({
      state: 'attached',
      timeout: 20000
    });

    await slot.scrollIntoViewIfNeeded();

    await slot.evaluate((element) => {
      (element as HTMLElement).click();
    });

    return this;
  }

  async bookNextAvailableTimeSlot() {
    console.log(
      '🔄 [Smart Logic] Starting Robust Chronological Slot Selection with JS Fallback...'
    );

    const now = new Date();
    const currentMinutes =
      now.getHours() * 60 +
      now.getMinutes() +
      now.getSeconds() / 60;

    console.log('⏰ Current Machine Time:', now.toTimeString());

    const freeSlotTexts = this.page.locator(
      'div.free-slots p.no-margin'
    );

    await freeSlotTexts.first().waitFor({
      state: 'attached',
      timeout: 15000
    });

    const count = await freeSlotTexts.count();
    const timePattern = /(\d{1,2}:\d{2}\s*(am|pm))/i;
    let slotSelected = false;

    for (let i = 0; i < count; i++) {
      const slotElement = freeSlotTexts.nth(i);

      try {
        const fullText = (await slotElement.textContent() ?? '').trim();
        const match = fullText.match(timePattern);

        if (!match) continue;

        const cleanTimeStr = match[1]
          .toLowerCase()
          .replace(/\s+/g, ' ');

        const parsed = cleanTimeStr.match(
          /^(\d{1,2}):(\d{2})\s*(am|pm)$/i
        );

        if (!parsed) continue;

        let hours = Number(parsed[1]);
        const minutes = Number(parsed[2]);
        const meridiem = parsed[3].toLowerCase();

        if (hours === 12) hours = 0;
        if (meridiem === 'pm') hours += 12;

        const slotMinutes = hours * 60 + minutes;

        if (slotMinutes >= currentMinutes) {
          console.log(
            `🎯 Target Slot Identified: [${cleanTimeStr}]. Processing interaction...`
          );

          const parentSlotDiv = slotElement.locator('xpath=..');

          try {
            await parentSlotDiv.click({ timeout: 3000 });
          } catch {
            await parentSlotDiv.evaluate((el) => {
              (el as HTMLElement).click();
            });
          }

          console.log(
            `✅ Successfully selected slot: ${cleanTimeStr}`
          );

          slotSelected = true;
          break;
        }
      } catch (error) {
        console.log(
          '⚠️ Skipping element evaluation block due to:',
          error
        );
      }
    }

    if (!slotSelected) {
      throw new Error(
        "❌ Automation Error: No valid future 'free-slots' could be interacted with in the current view."
      );
    }

    return this;
  }

  async selectVisitType() {
    await this.visitTypeOHC.check();
    return this;
  }

  async selectVisitType2() {
    const visitTypes = [
      {
        name: 'PayerVisitType2',
        locator: this.payerVisitType2
      },
      {
        name: 'StudentVisitType',
        locator: this.studentVisitType
      },
      {
        name: 'AnnualCheckVisitType',
        locator: this.annualCheckVisitType
      }
    ];

    for (const visitType of visitTypes) {
      console.log(`🔍 Attempting ${visitType.name}...`);

      try {
        await visitType.locator.waitFor({
          state: 'visible',
          timeout: 3000
        });
        await visitType.locator.check();
        console.log(`✅ Selected ${visitType.name}`);
        return this;
      } catch {
        console.log(
          `⚠️ ${visitType.name} not found. Trying next...`
        );
      }
    }

    throw new Error(
      '❌ Failure: Neither Payer, Student, nor Annual Check visit types were found.'
    );
  }

  async createVisitWorkflow(patientName: string, fees: string) {
    await this.click(this.visitTypeOHC);
    await this.fill(this.patientSearchInput, patientName);
    await this.click(this.searchButton);
    await this.click(this.searchResult);
    await this.click(this.confirmAppointmentAndCreateVisit);
    await this.click(this.visitTypeHO);
    await this.click(this.continueToVisit);
    await this.click(this.paymentButton);
    await this.fill(this.cashField, fees);
    await this.click(this.createVisitButton);
    await this.click(this.doneButton);
    return this;
  }

  async cancelAppointment() {
    await this.click(this.clinicButton, 10000);
    await this.click(this.clinicSelection, 10000);
    await this.click(this.practitionerSelection, 10000);
    await this.click(this.previewAppointment, 10000);
    await this.click(this.cancelAppointment, 10000);
    await this.click(this.appointmentCancelReason, 10000);
    await this.click(this.continueAppointmentCancellation, 10000);
  }

  async cancelBookedVisit() {
    await this.click(this.clinicButton, 10000);
    await this.click(this.clinicSelection, 10000);
    await this.click(this.practitionerSelection, 10000);
    await this.click(this.previewAppointment, 10000);
    await this.click(this.cancelVisitPatient, 10000);
    await this.click(this.wrongEntryRadio, 10000);
    await this.click(this.continueVisitCancellation, 10000);
  }

  async switchToArabicLanguage() {
    await this.click(this.languageMenu, 10000);
    await this.click(this.arabicLanguage, 10000);
  }

  async searchPatientID(id: string) {
    await this.fill(this.globalSearch, id);
    await this.fill(this.patientIdInput, id);
    await this.click(this.findButton);
    await this.patientList.waitFor({
      state: 'visible',
      timeout: 20000
    });
  }

  async searchPatientName(name: string) {
    await this.fill(this.globalSearch, name);
    await this.fill(this.firstName, name);
    await this.click(this.findButton);
    await this.patientList.waitFor({
      state: 'visible',
      timeout: 20000
    });
  }

  async searchNationalID(id: string) {
    await this.fill(this.globalSearch, id);
    await this.fill(this.nationalId, id);
    await this.click(this.findButton);
    await this.patientList.waitFor({
      state: 'visible',
      timeout: 20000
    });
  }

  async searchPatientGenderMale(name: string) {
    await this.fill(this.globalSearch, name);
    await this.fill(this.firstName, name);
    await this.click(this.male);
    await this.click(this.findButton);
    await this.patientList.waitFor({
      state: 'visible',
      timeout: 20000
    });
  }

  async searchPatientGenderFemale(name: string) {
    await this.fill(this.globalSearch, name);
    await this.fill(this.firstName, name);
    await this.click(this.female);
    await this.click(this.findButton);
    await this.patientList.waitFor({
      state: 'visible',
      timeout: 20000
    });
  }

  async searchBMS(id: string) {
    await this.fill(this.globalSearch, id);
    await this.click(this.findButton);
    await this.patientList.waitFor({
      state: 'visible',
      timeout: 20000
    });
  }

  async selectPatientIDByBMS() {
    await this.patientList.first().waitFor({
      state: 'visible',
      timeout: 20000
    });
    return (await this.patientList.first().innerText()).trim();
  }

  async exitPage() {
    await this.page.goBack();
  }

  async selectPayerFacility() {
    await this.page.locator('#facility-menu').click();
    await this.page
      .locator(
        "//div[contains(@class, 'facility-region-menu')]//div[normalize-space()='El Arab Center - UAT']"
      )
      .click();
    return this;
  }

  async selectPayerClinic() {
    await this.click(this.clinicButton);
    await this.click(
      this.page.locator("//*[@id='clinic-list']/div[2]/div[6]")
    );
    return this;
  }

  async selectPayerDoctor() {
    await this.click(this.practitionerSelection);
    return this;
  }

  async eligibilityCheck(patientPid: string) {
    await this.click(this.visitTypeHO);

    await this.fill(
      this.patientSearchInput,
      patientPid
    );

    await this.click(this.searchButton);

    await this.searchResult.waitFor({
      state: 'visible',
      timeout: 20000
    });

    await this.click(this.searchResult);

    await this.confirmAppointmentAndCreateVisit.waitFor({
      state: 'visible',
      timeout: 20000
    });

    await expect(
      this.confirmAppointmentAndCreateVisit
    ).toBeEnabled();

    await this.confirmAppointmentAndCreateVisit.click();

    return this;
  }

  async nonEligibilityCheck(patientPid: string) {
    await this.click(this.visitTypeHO);

    await this.fill(
      this.patientSearchInput,
      patientPid
    );

    await this.click(this.searchButton);

    await this.searchResult.waitFor({
      state: 'visible',
      timeout: 20000
    });

    await this.click(this.searchResult);

    await this.continueToVisit.waitFor({
      state: 'visible',
      timeout: 20000
    });

    await expect(this.continueToVisit).toBeEnabled();
    await this.continueToVisit.click();

    await this.confirmAppointmentAndCreateVisit.waitFor({
      state: 'visible',
      timeout: 20000
    });

    await expect(
      this.confirmAppointmentAndCreateVisit
    ).toBeEnabled();

    await this.confirmAppointmentAndCreateVisit.click();

    return this;
  }

  async sendRequestAndWaitForResponse() {
    await this.click(this.onlineEligibilityButton, 30000);
    await expect(this.eligibilitySuccessMessage).toBeVisible({
      timeout: 300000
    });
    await this.click(this.proceedRegistrationButton, 300000);
    await this.click(this.createVisitButton, 30000);
    await this.click(this.doneButton, 30000);
  }

  async sendRequestAndWaitForResponseNoneligible() {
    await this.click(this.onlineEligibilityButton, 30000);

    await expect(this.eligibilityFailureModal).toBeVisible({
      timeout: 300000
    });

    await this.click(this.eligibilityFailureProceedButton, 30000);
    await this.click(this.proceedWithCashButton, 30000);
    await this.click(this.createVisitButton, 30000);
    await this.click(this.doneButton, 30000);
  }

  async validateEligiblePatient(id: string) {
    await this.searchBMS(id);
    return this.selectPatientIDByBMS();
  }

  async verifyStatusIsApproved() {
    await expect(
      this.page
        .locator('.approvals-queue-status')
        .filter({ hasText: 'Approved' })
    ).toBeVisible({
      timeout: 30000
    });
  }

  async billPage(patientName: string) {
    await this.click(this.actionsButton, 10000);
    await this.click(this.manageBillButton, 10000);
    await this.fill(this.searchBillPatient, patientName, 10000);
    await this.click(this.findBillButton, 10000);
    await this.click(this.searchPatientList, 10000);
    await this.click(this.chooseVisitForBill, 10000);
    await this.click(this.printBillButton, 10000);
    await this.click(this.printButton, 10000);
    await this.click(this.closeButton, 10000);
  }

  async payBill(patientName: string) {
    await this.click(this.actionsButton, 10000);
    await this.click(this.manageBillButton, 10000);
    await this.fill(this.searchBillPatient, patientName, 10000);
    await this.click(this.findBillButton, 10000);
    await this.click(this.searchPatientList, 10000);
    await this.click(this.chooseVisitForBill, 10000);
    await this.click(this.payBillButton, 10000);
    await this.click(this.paymentBillButton, 10000);
    await this.click(this.closeButton, 10000);
  }

  async SelectClinic() {
    return this.selectClinic();
  }

  async SelectPractitioner() {
    return this.selectPractitioner();
  }

  async EligibilityCheck(patientPid: string) {
    return this.eligibilityCheck(patientPid);
  }

  async NonEligibilityCheck(patientPid: string) {
    return this.nonEligibilityCheck(patientPid);
  }

  async SearchPatientID(id: string) {
    return this.searchPatientID(id);
  }

  async SearchPatientName(name: string) {
    return this.searchPatientName(name);
  }

  async SearchNationalID(id: string) {
    return this.searchNationalID(id);
  }

  async SearchPatientGenderMale(name: string) {
    return this.searchPatientGenderMale(name);
  }

  async SearchPatientGenderFemale(name: string) {
    return this.searchPatientGenderFemale(name);
  }

  async SearchBMS(id: string) {
    return this.searchBMS(id);
  }

  async ValidateEligiblePatient(id: string) {
    return this.validateEligiblePatient(id);
  }

  async CancelBookedVisit() {
    return this.cancelBookedVisit();
  }

  async CancelAppointment() {
    return this.cancelAppointment();
  }

  async BillPage(patientName: string) {
    return this.billPage(patientName);
  }

  async PayBill(patientName: string) {
    return this.payBill(patientName);
  }
}