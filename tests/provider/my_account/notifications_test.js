/*
*   REQUIREMENTS TO RUN:
*
* - At least one notification toggle must be enabled and at least one must be disabled (otherwise the test will fail
* if try to save changes when none of them be enabled after toggle changes).
* - It shouldn't have any custom notification previously added
*/

module.exports = {
    
    //To run only one test, change this before function to 'beforeEach'
    before: function (browser) {
        notificationsPage = browser.page.provider.my_account.notificationsPage()
        notificationsPage.accessNotificationsPage(browser.globals.providerEmail, browser.globals.providerPassword)
    },
    
    "Edit Notification Channels": function (browser) {
        //edit notification fields
        notificationsPage.editTextField('@emailNotifField', "test@evisit.com")
        notificationsPage.editTextField('@phoneNotifField', "555-555-5555")
        notificationsPage.editTextField('@smsNotifField', "555-555-5555")
        notificationsPage.click('@saveChangesButton')
        //TODO: check confirmation toast when it exists - Bug #8aka6k

        //assert changes persistence
        notificationsPage.checkNotificationPersistence("test@evisit.com","555-555-5555", "555-555-5555")
    },

    "Toogle Notification Channels": function (browser) {
        notificationsPage.toggleNotifChannelsAndCheck()
        
        //TODO: check confirmation toast when it exists - Bug #8aka6k
        //TODO: check persistence - Depends on #275v9m - Verified with CSS workaround
    },

    "Add Notifications Channels": function (browser){
        notificationsPage.addEmailNotification("newchannel@evisit.com")
        notificationsPage.addPhoneNotification("111-111-1111")
        notificationsPage.addSMSNotification("222-222-2222")
        //TODO: check confirmation toast when it exists - Bug #8aka6k
    },

    "Remove Notification Channels": function (browser) {
        notificationsPage.removeCustomChannels()
        //TODO: check confirmation toast when it exists - Bug #8aka6k
    },

    //This test is failing due to the bug of not saving after logout
    "Select All Notify Me When Checkboxes": function (browser) {
        //Check the changed status of "Select All" according to the previous status
        notificationsPage.selectAll('@selectAllNotifyMe',  isSelected => {
            //Logout, login and access Notifications Page again to check persistence
            notificationsPage.accessNotificationsSectionAfterLogout(browser.globals.providerEmail, browser.globals.providerPassword)
            //Check if the changes were saved after logout
            notificationsPage.checkPersistenceOfSelectAllNotifyMe(isSelected)
        })
    },

    "Select All Notify My Patients Checkboxes": function (browser) {
        //Check the changed status of "Select All" according to the previous status
        notificationsPage.selectAll('@selectAllNotifyMyPatients',  isSelected => {
            //Logout, login and access Notifications Page again to check persistence
            notificationsPage.accessNotificationsSectionAfterLogout(browser.globals.providerEmail, browser.globals.providerPassword)
            //Check if the changes were saved after logout
            notificationsPage.checkPersistenceOfSelectAllNotifyMyPatients(isSelected)
        })
    },

    //This test is failing due to the bug of not saving after logout
    "Select Only One of Notify Me When Checkboxes": function (browser) {
        notificationsPage.selectOnlyOne('@leftCheckbox1', '@selectAllNotifyMe')
        //Logout, login and access Notifications Page again to check persistence
        notificationsPage.accessNotificationsSectionAfterLogout(browser.globals.providerEmail, browser.globals.providerPassword)
        //Check if the changes were saved after logout
        notificationsPage.checkPersistenceOfSelectOnlyOneNotifyMe()
    },

    "Select Only One of Notify My Patients Checkboxes": function (browser) {
        notificationsPage.selectOnlyOne('@rightCheckbox1', '@selectAllNotifyMyPatients')
        //Logout, login and access Notifications Page again to check persistence
        notificationsPage.accessNotificationsSectionAfterLogout(browser.globals.providerEmail, browser.globals.providerPassword)
        //Check if the changes were saved after logout
        notificationsPage.checkPersistenceOfSelectOnlyOneNotifyMyPatients()
    },

    after: function (browser) {
        browser.end();
    }
};