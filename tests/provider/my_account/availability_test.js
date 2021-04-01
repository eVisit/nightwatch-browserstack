/*
*   REQUIREMENTS TO RUN:
*
* - The user "Omega Provider 2" must be available
* - The user "Omega Provider 2" should not have any availability block added
*/

module.exports = {
    //To run only one test, change this before function to 'beforeEach'
    before: function (browser) {
        availabilityPage = browser.page.provider.my_account.availabilityPage()
        availabilityPage.accessAvailabilityPage(browser.globals.providerEmail, browser.globals.providerPassword)
        
    },
    
    "Create and Remove availability blocks": function (browser) {
        availabilityPage.searchProvider("Omega Provider 2")            

        //create a block of type "Schedulable & Available" and with no repeat, check and delele block
        availabilityPage.createCheckAndDeleteBlock('@day1Block2', 1, false)
        //create a block of type "Schedulable Only" and with no repeat, check and delele block
        availabilityPage.createCheckAndDeleteBlock('@day2Block2', 2, false)
        //create a block of type "Available Only" and with no repeat, check and delele block
        availabilityPage.createCheckAndDeleteBlock('@day3Block2', 3, false)
        //create a block of type "Schedulable & Available" and with repeat, check and delele block
        availabilityPage.createCheckAndDeleteBlock('@day4Block2', 1, true)

    },

    after: function (browser) {
        browser.end();
    }
};