/*
*   REQUIREMENTS TO RUN:
*
* - Valid provider user configured as global variable. PS: taylor+provider@evisit.com has all info needed already
* - Omega practice running on release environment
* - The patient searched (taylor+o14@evisit.com) should be available
* - The timezone needs to be changed in the conf.js file to be the same as the local computer requesting browserstack to run the test
* - Several tests on this suite require specific information passed through parameters already configured
*/

module.exports = {
    "Check Patient's tab Information - Page Filters": function (browser) {
        const PatientsPage = browser.page.provider.PatientsPage()

        // Login as a provider and go to the patients page
        PatientsPage.accessPatientsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for specific patients in order to test the filters available
        PatientsPage.findPatient('Pending', 'All', '34317', 'registration+10+21+34317@evisit.com', 'Pending')
        PatientsPage.findPatient('Registered', 'RecentlySeen', 'Alexander', 'Alexander Telegin', 'Registered')
        PatientsPage.findPatient('Registered', 'RecentlyRegistered', 'marc+mptestishforhotfix@evisit.com', 'Marc Taylor', 'Registered')
    },

    "Check Patient's tab Information - Patient Profile > Personal Info": function (browser) {
        const PatientsPage = browser.page.provider.PatientsPage()

        // Login as a provider and go to the patients page
        PatientsPage.accessPatientsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a specific patient already configured to be used in the automation proccess
        PatientsPage.searchName("First Name Edited")
        // Verify all information in the patient found with the filter
        PatientsPage.checkFirstRow('First Name Edited Last Name Edited', 'Registered')
        // Make sure the Patient Profile show all the expected options
        PatientsPage.checkPatientProfile()
        // Compare the provided values with the ones expected for the patient profile based in the patient's settings test (should be default for this patient)
        PatientsPage.checkPersonalInfo('First Name Edited', 'Middle Name Edited', 'Last Name Edited', 'Address 1 Edited', 'Address 2 Edited', 'City Edited', 'Wyoming', '12345', '480-289-1576', '09/06/1990', 'Female', 'America/Noronha (-02 -0200)')
    },

    "Check Patient's tab information - Patient Profile > Insurance": function (browser) {
        const PatientsPage = browser.page.provider.PatientsPage()

        // Login as a provider and go to the patients page
        PatientsPage.accessPatientsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a specific patient already configured to be used in the automation proccess
        PatientsPage.searchName("First Name Edited")
        // Verify all information in the patient found with the filter
        PatientsPage.checkFirstRow('First Name Edited Last Name Edited', 'Registered')
        // Compare the insurance on screen with expected values based in the patient's settings test (should be default for this patient)
        PatientsPage.checkInsurance('Automation Insurance Test', 'Self', '123', '321', 'Other', '555-555-5555')
    },

    "Check Patient's tab information - Patient Profile > Health Records": function (browser) {
        const PatientsPage = browser.page.provider.PatientsPage()

        // Login as a provider and go to the patients page
        PatientsPage.accessPatientsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a specific patient already configured to be used in the automation proccess
        PatientsPage.searchName("First Name Edited")
        // Verify all information in the patient found with the filter
        PatientsPage.checkFirstRow('First Name Edited Last Name Edited', 'Registered')
        // Check if all expected health records types are visible as options
        PatientsPage.checkHealthRecordsSidepanel()
        // Edit each type of health record with default and custom entries
        // Will validate the update time and the number of elements in the list
        PatientsPage.editHealthRecordAnyType('GeneralAllergies', 1, 'Patients - GeneralAllergies - Aut')
        PatientsPage.editHealthRecordAnyType('MedicationAllergies', 2, 'Patients - MedicationAllergies - Aut')
        PatientsPage.editHealthRecordAnyType('Medications', 3, 'Patients - Medications - Aut')
        PatientsPage.editHealthRecordAnyType('Conditions', 4, 'Patients - Conditions - Aut')
        PatientsPage.editHealthRecordAnyType('Procedures', 5, 'Patients - Procedures - Aut')
        PatientsPage.editHealthRecordAnyType('FamilyHistory', 1, 'Patients - FamilyHistory - Aut')
        // Specific function for the questionnaire page since it works differently
        PatientsPage.checkQuestionnaire('No', 'No')
    },

    "Check Patient's tab information - Patient Profile > Visit History": function (browser) {
        const PatientsPage = browser.page.provider.PatientsPage()

        // Login as a provider and go to the patients page
        PatientsPage.accessPatientsPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Search for a specific patient already configured to be used in the automation proccess
        PatientsPage.searchName("First Name Edited")
        // Verify all information in the patient found with the filter
        PatientsPage.checkFirstRow('First Name Edited Last Name Edited', 'Registered')
        // Select a visit based in a known date and compare the info displayed with the expected values
        PatientsPage.checkVisitHistoryListed('September 15, 2020', 'test', 'test', 'No prescriptions have been submitted.', '$50.00', 'Chat was not utilized in this visit.', 2)
    },

    afterEach: function (browser) {
        browser.end();
    }
};