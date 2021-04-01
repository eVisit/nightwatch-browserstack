var temp_email = "provider_temporary@evisit.com"
var temp_password = "Temporary123!"
let settingsPage;

module.exports = {
    
    beforeEach: function (browser) {
        settingsPage = browser.page.patient.my_account.settingsPage();
    },
    //Change email and password of Provider account
    "Edit Settings Successfully": function (browser) {
        settingsPage.accessProviderSettingsPage(browser.globals.providerEmail, browser.globals.providerPassword)
            .changeEmail(temp_email, browser.globals.providerPassword)
            .checkToastMessage("Email updated successfully.")
            .changePassword(temp_password, browser.globals.providerPassword)
            .checkToastMessage("Password updated successfully.")
            .click('@btnCloseToast')
            .waitForElementNotPresent('@toast')
            
            //log out and log in with changed credentials
            .accessProviderSettingsSectionAfterLogout(temp_email, temp_password)
            //change back to default email
            .changeEmail(browser.globals.providerEmail, temp_password)
            .checkToastMessage("Email updated successfully.")
            //change back to default password
            .changePassword(browser.globals.providerPassword, temp_password)
            .checkToastMessage("Password updated successfully.")
    },

    afterEach: function (browser) {
        browser.end();
    }
};