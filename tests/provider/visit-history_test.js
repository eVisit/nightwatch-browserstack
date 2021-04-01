/*
*   REQUIREMENTS TO RUN:
*
* - Valid provider user configured as global variable. PS: taylor+provider@evisit.com has all info needed already
* - Omega practice running on release environment
* - The user need to have a visit already in the visit history
* - The timezone needs to be changed in the conf.js file to be the same as the local computer requesting browserstack to run the test
* - Several tests on this suite require specific information passed through parameters already configured
*/

module.exports = {

    "Check Visit History tab Information - Page Filters": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for specific visits in order to test the filters available
        visitHistoryPage.findVisitAllFilters('Incomplete', 'Scheduled', 'AAAOmega', '10/15/2020', 'TESTr TESTr', 
        'TESTr TESTr', 'Male, 28 yrs', 'General Visit', 'AAAOmega Provider 1', 'Oct 21, 2020 at 12:00am')
        visitHistoryPage.findVisitAllFilters('Complete', 'OnDemand', 'Automation', '10/6/2020', 'Marc Taylor', 
        'Marc Taylor', 'Male, 32 yrs', 'General Visit', 'Automation Provider', 'Oct 6, 2020 at 4:40pm')
        visitHistoryPage.findVisitAllFilters('Complete', 'OnDemand', 'Automation', '9/15/2020', 'First Name Edited', 
        'First Name Edited Last Name Edited', 'Female, 30 yrs', 'General Visit', 'Automation Provider', 'Sep 15, 2020 at 2:52pm')
    },

    "Check Visit History tab Information - Visit Details": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
         // Search for a known visit
         visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
         // Check if the answers for the visit details are the same as expected
         visitHistoryPage.checkVisitDetails('test', 'test', 'The survey was not taken')
    },

    "Check Visit History tab Information - Patient Profile": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
         // Search for a known visit
         visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Make sure the Patient Profile show all the expected options
        visitHistoryPage.checkPatientProfile()
    },

    "Check Visit History tab Information - Patient Profile > Personal Info": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
         // Search for a known visit
         visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Compare the provided values with the ones expected for the patient profile based in the settings test (should be default for this patient)
        visitHistoryPage.checkPersonalInfo('First Name Edited', 'Middle Name Edited', 'Last Name Edited', 'Address 1 Edited', 'Address 2 Edited', 'City Edited', 'Wyoming', '12345', '480-289-1576', '09/06/1990', 'Female', 'America/Noronha (-02 -0200)')
    },

    "Check Visit History tab Information - Patient Profile > Insurance": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
         // Search for a known visit
         visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Compare the insurance on screen with expected values based in the settings test (should be default for this patient)
        visitHistoryPage.checkInsurance('Automation Insurance Test', 'Self', '123', '321', 'Other', '555-555-5555')
    },

    "Check Visit History tab Information - Patient Profile > Health Records": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a known visit
        visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')

        // Check if all expected health records types are visible as options
        visitHistoryPage.checkHealthRecordsSidepanel()
        // Edit each type of health record with default and custom entries
        // Will validate the update time and the number of elements in the list
        visitHistoryPage.editHealthRecordAnyType('GeneralAllergies', 1, 'Visit History - GeneralAllergies - Aut')
        visitHistoryPage.editHealthRecordAnyType('MedicationAllergies', 2, 'Visit History - MedicationAllergies - Aut')
        visitHistoryPage.editHealthRecordAnyType('Medications', 3, 'Visit History - Medications - Aut')
        visitHistoryPage.editHealthRecordAnyType('Conditions', 4, 'Visit History - Conditions - Aut')
        visitHistoryPage.editHealthRecordAnyType('Procedures', 5, 'Visit History - Procedures - Aut')
        visitHistoryPage.editHealthRecordAnyType('FamilyHistory', 1, 'Visit History - FamilyHistory - Aut')
        // Specific function for the questionnaire page since it works differently
        visitHistoryPage.checkQuestionnaire('No', 'No')
    },

    "Check Visit History tab Information - Patient Profile > Visit History": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
         // Search for a known visit
         visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Select a visit based in a known date and compare the info displayed with the expected values
        visitHistoryPage.checkVisitHistoryListed('September 15, 2020', 'test', 'test', 'No prescriptions have been submitted.', '$50.00', 'Chat was not utilized in this visit.', 2)
    },

    "Check Visit History tab Information - Attachments": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a known visit
        visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Make sure the visit have the expected number of attachments saved
        visitHistoryPage.checkAttachments(2)
    },

    "Check Visit History tab Information - Chart": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a known visit
        visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Make sure all chart answers are the expected ones
        visitHistoryPage.checkChartAnswers('test','Not fulfilled.','Not fulfilled.','Not fulfilled.','Not fulfilled.','Not fulfilled.', '10/28/2020 - 10:46 AM', 'Addendum Automation')
    },

    "Check Visit History tab Information - ePrescribe > Pharmacy": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a known visit
        visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Check ePrescribe tab elements
        visitHistoryPage.checkEPrescribeitems()
        // Select a feew different pharmacies for the patient
        visitHistoryPage.changePharmacy('85210')
        visitHistoryPage.changePharmacy('47374')
    },

    "Check Visit History tab Information - ePrescribe > Prescriptions": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a known visit
        visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Check ePrescribe tab elements
        visitHistoryPage.checkEPrescribeitems()
        // Add a new medication and supply in the visit
        visitHistoryPage.removePrescriptions()
        visitHistoryPage.addPrescription('Medication', 'Amoxicillin', '2', '3') 
        visitHistoryPage.removePrescriptions()
        visitHistoryPage.addPrescription('Supply', 'Supply Automation', '5', '40') 
        visitHistoryPage.removePrescriptions()
    },

    "Check Visit History tab Information - Payments": function (browser) {
        const visitHistoryPage = browser.page.provider.visitHistoryPage()

        // Login as a provider and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a known visit
        visitHistoryPage.findVisitByDateAndSearch('9/15/2020', 'First Name Edited')
        // Make sure the payment show the correct value
        visitHistoryPage.checkPayments('$50.00')
    },

    afterEach: function (browser) {
        browser.end();
    }
};