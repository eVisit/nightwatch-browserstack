module.exports = {
    "Scheduling Test - Existing patient new schedule": function (browser) {
        const schedulerPage = browser.page.provider.schedulerPage()

        schedulerPage.accessSchedulerPage(browser.globals.providerEmail, browser.globals.providerPassword)
        schedulerPage.clearVisits()
        schedulerPage.scheduleExistingPatient()
    },

    "Scheduling Test - New patient new schedule": function (browser) {
        const schedulerPage = browser.page.provider.schedulerPage()

        schedulerPage.accessSchedulerPage(browser.globals.providerEmail, browser.globals.providerPassword)
        schedulerPage.clearVisits()
        schedulerPage.scheduleNewPatient()
    },

    "Reschedule Test - Reschedule visit for one day later": function (browser) {
        const schedulerPage = browser.page.provider.schedulerPage()

        schedulerPage.accessSchedulerPage(browser.globals.providerEmail, browser.globals.providerPassword)
        schedulerPage.clearVisits()
        schedulerPage.scheduleNewPatient()
        schedulerPage.rescheduleVisit()

    },

    afterEach: function (browser) {
        browser.end();
    }
};