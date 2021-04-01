var temp_email = "temporary@evisit.com"
var temp_password = "Temporary123!"
let settingsPage;

module.exports = {
    
    before: function (browser) {
        settingsPage = browser.page.patient.my_account.settingsPage();
    },

    //Change email and password and revert info
    "Edit Settings Successfully": function (browser) {
        settingsPage.accessSettingsPage(browser.globals.email, browser.globals.password)
            .changeEmail(temp_email, browser.globals.password)
            .checkToastMessage("Email updated successfully.")
            .changePassword(temp_password, browser.globals.password)
            .checkToastMessage("Password updated successfully.")

            .click('@btnCloseToast')
            .waitForElementNotPresent('@toast')
            
            //log out and log in with changed credentials
            .accessSettingsSectionAfterLogout(temp_email, temp_password)
            //change back to default email
            .changeEmail(browser.globals.email, temp_password)
            .checkToastMessage("Email updated successfully.")
            //change back to default password
            .changePassword(browser.globals.password, temp_password)
            .checkToastMessage("Password updated successfully.")
    },

    after: function (browser) {
        browser.end();
    }
};