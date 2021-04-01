/*
*   REQUIREMENTS TO RUN:
*
* - At least one notification toggle must be enabled and at least one must be disabled (otherwise the test will fail
* if try to save changes when none of them be enabled after toggle changes).
*/

module.exports = {
    
    before: function (browser) {
        settingsPage = browser.page.patient.my_account.settingsPage();
    },
    
    "Edit Notification Channels": function (browser) {
        
        settingsPage.accessSettingsPage(browser.globals.email, browser.globals.password)
            //edit notification fields
            .editTextField('@emailNotifField', "test@evisit.com")
            .editTextField('@phoneNotifField', "555-555-5555")
            .editTextField('@smsNotifField', "555-555-5555")
            .click('@saveChangesButton')
        
        //TODO: check confirmation toast when it exists - Bug #8aka6k

        //assert changes persistence
        settingsPage.checkNotificationPersistence("test@evisit.com","555-555-5555", "555-555-5555")
    },

    //TODO: Add new notification channel

    "Toogle Notification Channels": function (browser) {
        settingsPage.toggleNotifChannelsAndCheck()

        //TODO: check confirmation toast when it exists - Bug #8aka6k
        //TODO: check persistence - Depends on #275v9m - Verified with CSS workaround
    },

    after: function (browser) {
        browser.end();
    }
};