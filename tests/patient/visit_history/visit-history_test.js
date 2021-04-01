/*
*   REQUIREMENTS TO RUN:
*
* - Valid patient user configured as global variable. PS: taylor+014@evisit.com has all info needed already
* - Omega practice running on release environment
* - The user need to have a visit already in the visit history
* - The timezone needs to be changed in the conf.js file to be the same as the local computer requesting browserstack to run the test
* - Several tests on this suite require specific information passed through parameters already configured
*/

module.exports = {

    "Check Patient's Visit History information - Visit Details": function (browser) {
        const visitHistoryPage = browser.page.patient.visit_history.visitHistoryPage()

        // Login as a patient and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.email, browser.globals.password)
        // Change the date filter to a value with a known visit
        visitHistoryPage.changeDateFilter("09/15/2020")
        // Verify all information in the visit found with the filter
        visitHistoryPage.checkFirstRow('First Name Edited Last Name Edited','Female, 30 yrs','General Visit','Automation Provider, Suffix','Sep 15, 2020 at 7:52pm')
        // Check if the answers for the visit details are the same as expected
        visitHistoryPage.checkVisitDetails('test', 'test')
    },

    "Check Patient's Visit History information - Patient Profile > Personal Info": function (browser) {
        const visitHistoryPage = browser.page.patient.visit_history.visitHistoryPage()

        // Login as a patient and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.email, browser.globals.password)
        // Change the date filter to a value with a known visit
        visitHistoryPage.changeDateFilter("09/15/2020")
        // Verify all information in the visit found with the filter
        visitHistoryPage.checkFirstRow('First Name Edited Last Name Edited','Female, 30 yrs','General Visit','Automation Provider, Suffix','Sep 15, 2020 at 7:52pm')
        // Make sure the Patient Profile show all the expected options
        visitHistoryPage.checkPatientProfile()
        // Compare the provided values with the ones expected for the patient profile based in the settings test (should be default for this user)
        visitHistoryPage.checkPersonalInfo('First Name Edited', 'Middle Name Edited', 'Last Name Edited', 'Address 1 Edited', 'Address 2 Edited', 'City Edited', 'Wyoming', '12345', '480-289-1576', '09/06/1990', 'Female', 'America/Noronha (-02 -0200)')
    },

    "Check Patient's Visit History information - Patient Profile > Insurance": function (browser) {
        const visitHistoryPage = browser.page.patient.visit_history.visitHistoryPage()

        // Login as a patient and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.email, browser.globals.password)
        // Change the date filter to a value with a known visit
        visitHistoryPage.changeDateFilter("09/15/2020")
        // Verify all information in the visit found with the filter
        visitHistoryPage.checkFirstRow('First Name Edited Last Name Edited','Female, 30 yrs','General Visit','Automation Provider, Suffix','Sep 15, 2020 at 7:52pm')
        // Make sure the Patient Profile show all the expected options
        visitHistoryPage.checkPatientProfile()
        // Compare the insurance on screen with expected values based in the settings test (should be default for this user)
        visitHistoryPage.checkInsurance('Automation Insurance Test', 'Self', '123', '321', 'Other', '555-555-5555')
    },

    "Check Patient's Visit History information - Patient Profile > Health Records": function (browser) {
        const visitHistoryPage = browser.page.patient.visit_history.visitHistoryPage()

        // Login as a patient and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.email, browser.globals.password)
        // Change the date filter to a value with a known visit
        visitHistoryPage.changeDateFilter("09/15/2020")
        // Verify all information in the visit found with the filter
        visitHistoryPage.checkFirstRow('First Name Edited Last Name Edited','Female, 30 yrs','General Visit','Automation Provider, Suffix','Sep 15, 2020 at 7:52pm')
        // Make sure the Patient Profile show all the expected options
        visitHistoryPage.checkPatientProfile()
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
        visitHistoryPage.editQuestionnaire()
    },

    "Check Patient's Visit History information - Patient Profile > Visit History": function (browser) {
        const visitHistoryPage = browser.page.patient.visit_history.visitHistoryPage()

        // Login as a patient and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.email, browser.globals.password)
        // Change the date filter to a value with a known visit
        visitHistoryPage.changeDateFilter("09/15/2020")
        // Verify all information in the visit found with the filter
        visitHistoryPage.checkFirstRow('First Name Edited Last Name Edited','Female, 30 yrs','General Visit','Automation Provider, Suffix','Sep 15, 2020 at 7:52pm')
        // Make sure the Patient Profile show all the expected options
        visitHistoryPage.checkPatientProfile()
        // Select a visit based in a known date and compare the info displayed with the expected values
        visitHistoryPage.checkVisitHistoryListed('September 15, 2020', 'test', 'test', 'No prescriptions have been submitted.', '$50.00', 'Chat was not utilized in this visit.', 2)
    },

    "Check Patient's Visit History information - Attachments": function (browser) {
        const visitHistoryPage = browser.page.patient.visit_history.visitHistoryPage()

        // Login as a patient and go to the visit history page
        visitHistoryPage.accessVisitHistoryPage(browser.globals.email, browser.globals.password)
        // Change the date filter to a value with a known visit
        visitHistoryPage.changeDateFilter("09/15/2020")
        // Verify all information in the visit found with the filter
        visitHistoryPage.checkFirstRow('First Name Edited Last Name Edited','Female, 30 yrs','General Visit','Automation Provider, Suffix','Sep 15, 2020 at 7:52pm')
        // Make sure the visit have the expected number of attachments saved
        visitHistoryPage.checkAttachments(2)
    },

    afterEach: function (browser) {
        browser.end();
    }
};