module.exports = {
    "Login - Patient login Successfully": function (browser) {
        const landingPage = browser.page.patient.landingPage()

        landingPage.accessLandingPage(browser.globals.email, browser.globals.password)
    },

    "Login - Patient fails to login": function (browser) {
        const loginPage = browser.page.loginPage()

        loginPage.goToPracticeLoginPage()
        // Try to login with invalid email
        loginPage.loginInvalidEmail(browser.globals.password)
        // Try to login with wrong password
        loginPage.loginWrongPassword(browser.globals.email)

    },

    "Logout - Patient logout Successfully": function (browser) {
        const landingPage = browser.page.patient.landingPage()

        landingPage.accessLandingPage(browser.globals.email, browser.globals.password)
        // Open logout modal and cancel
        landingPage.selectLogout()
        landingPage.denyLogout()
        // Open logout modal and accept logout
        landingPage.selectLogout()
        landingPage.acceptLogout()
    },

    afterEach: function (browser) {
        browser.end();
    }
};