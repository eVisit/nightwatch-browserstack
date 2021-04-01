/*
*   REQUIREMENTS TO RUN:
*
* - Omega practice running on release environment
* - The geolocation needs to be changed in the conf.js file to other than US. Brazil is currently configured as the one to be used
*/

module.exports = {
    "Registration - Successful new registration": function (browser) {
        const loginPage = browser.page.loginPage()
        const geolocationPage = browser.page.patient.geolocationPage()
        const personalInfoPage = browser.page.patient.first_time_login.personalInfoPage()
        //const profilePicturePage = browser.page.patient.first_time_login.profilePicturePage()
        const insurancePage = browser.page.patient.first_time_login.insurancePage()
        const welcomePage = browser.page.patient.first_time_login.welcomePage()

        // Open website using environment and practice defined as global variables
        loginPage.goToPracticeLoginPage()
        // Register a new email successfully and login
        loginPage.registrationSuccess(browser.globals.password)
        // Select a state and continue from geolocation page
        geolocationPage.confirmGeolocation()
        // Add all valid information as personal info and continue
        personalInfoPage.confirmPersonalInfo("First Name Edited", "Middle Name Edited","Last Name Edited", 
        "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "12345", 
        "480-289-1576", "09/06/1990", "femaleOption", "")
        // Skip the profile picture step
        //commented out as we no longer present the profile picture option in the registration flow
        //profilePicturePage.skipProfilePicture()
        // Add new valid information as insurance
        insurancePage.addNewInsurance()
        // Reach welcome page and check text on this page
        welcomePage.checkWelcomeText()
    },

    "Registration - Registration failure messages": function (browser) {
        const loginPage = browser.page.loginPage()

        // Open website using environment and practice defined as global variables
        loginPage.goToPracticeLoginPage()
        // Fail to register because of missing info
        //loginPage.registrationFailureAllMissing()
        // Fail to register because the email is already used
        loginPage.registrationFailureEmailAlreadyUsed(browser.globals.email, browser.globals.password)
        // Fail to register because the password confirmation is wrong
        //loginPage.registrationFailureDifferentPasswords(browser.globals.password)
        // Fail to register because the password is invalid
        //loginPage.registrationFailureInvalidPassword()
        // Fail to register because the agreement checkbox is not selected
        //loginPage.registrationFailureAgreementNotAccepted(browser.globals.password)
    },

    "Registration - Geolocation failure messages": function (browser) {
        const loginPage = browser.page.loginPage()
        const geolocationPage = browser.page.patient.geolocationPage()

        // Open website using environment and practice defined as global variables
        loginPage.goToPracticeLoginPage()
        // Register a new email successfully and login
        loginPage.registrationSuccess(browser.globals.password)
        // Check different wrong attemps to skip geolocation page
        geolocationPage.checkGeolocationFailureMessages()
    },

    "Registration - Personal Info failure messages": function (browser) {
        const loginPage = browser.page.loginPage()
        const geolocationPage = browser.page.patient.geolocationPage()
        const personalInfoPage = browser.page.patient.first_time_login.personalInfoPage()

        // Open website using environment and practice defined as global variables
        loginPage.goToPracticeLoginPage()
        // Register a new email successfully and login
        loginPage.registrationSuccess(browser.globals.password)
        // Continue from the geolocation page
        geolocationPage.confirmGeolocation()
        // Check several different messages from wrong attemps to fill in personal information
        personalInfoPage.personalInfoFailureMessages()
    },

    // we no longer present profile picture in the registration flow. leaving here for reference. 

    // "Registration - Skip profile picture successfully": function (browser) {
    //     const loginPage = browser.page.loginPage()
    //     const geolocationPage = browser.page.patient.geolocationPage()
    //     const personalInfoPage = browser.page.patient.first_time_login.personalInfoPage()
    //     const profilePicturePage = browser.page.patient.first_time_login.profilePicturePage()
    //     const insurancePage = browser.page.patient.first_time_login.insurancePage()

    //     // Open website using environment and practice defined as global variables
    //     loginPage.goToPracticeLoginPage()
    //     // Register a new email successfully and login
    //     loginPage.registrationSuccess(browser.globals.password)
    //     // Select a state and continue from geolocation page
    //     geolocationPage.confirmGeolocation()
    //     // Add all valid information as personal info and continue
    //     personalInfoPage.confirmPersonalInfo("First Name Edited", "Middle Name Edited","Last Name Edited", 
    //     "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "12345", 
    //     "480-289-1576", "09/06/1990", "femaleOption", "")
    //     // Skip the profile picture step
    //     profilePicturePage.skipProfilePicture()
    //     // Verify if insurance page was reached
    //     insurancePage.isOnPage()

    // },

    "Registration - Insurance failure messages": function (browser) {
        const loginPage = browser.page.loginPage()
        const geolocationPage = browser.page.patient.geolocationPage()
        const personalInfoPage = browser.page.patient.first_time_login.personalInfoPage()
        //const profilePicturePage = browser.page.patient.first_time_login.profilePicturePage()
        const insurancePage = browser.page.patient.first_time_login.insurancePage()

        // Open website using environment and practice defined as global variables
        loginPage.goToPracticeLoginPage()
        // Register a new email successfully and login
        loginPage.registrationSuccess(browser.globals.password)
        // Select a state and continue from geolocation page
        geolocationPage.confirmGeolocation()
        // Add all valid information as personal info and continue
        personalInfoPage.confirmPersonalInfo("First Name Edited", "Middle Name Edited","Last Name Edited", 
        "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "12345", 
        "480-289-1576", "09/06/1990", "femaleOption", "")
        //no longer have profile picture in this flow. leaving for reference. 
        // Skip the profile picture step
        //profilePicturePage.skipProfilePicture()
        // Check different failure scenarios of filling in insurance information
        insurancePage.checkEmptyCompanyNameFailureMessage()
        insurancePage.checkAgreementRequiredFailureMessage()
    },

    afterEach: function (browser) {
        browser.end();
    }
};