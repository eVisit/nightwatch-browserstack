module.exports = {
    "Login - Provider login Successfully": function (browser) {
        const waitingRoomPage = browser.page.provider.waitingRoomPage()

        waitingRoomPage.accessWaitingRoomPage(browser.globals.providerEmail, browser.globals.providerPassword)
    },

    "Logout - Provider logout Successfully": function (browser) {
        const waitingRoomPage = browser.page.provider.waitingRoomPage()

        waitingRoomPage.accessWaitingRoomPage(browser.globals.providerEmail, browser.globals.providerPassword)
        // Open logout modal and cancel
        waitingRoomPage.selectLogout()
        waitingRoomPage.denyLogout()
        // Open logout modal and accept logout
        waitingRoomPage.selectLogout()
        waitingRoomPage.acceptLogout()
    },

    afterEach: function (browser) {
        browser.end();
    }
};