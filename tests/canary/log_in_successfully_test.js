module.exports = {
    "Login - Patient login Successfully": function (browser) {
        const landingPage = browser.page.patient.landingPage()

        landingPage.accessLandingPage(browser.globals.email, browser.globals.password)
    },

    afterEach: function (browser) {
        browser.end();
    }
};