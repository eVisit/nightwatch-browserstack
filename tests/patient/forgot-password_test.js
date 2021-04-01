module.exports = {
    "Forgot Password - Valid Email": function (browser) {
        const loginPage = browser.page.loginPage()

        //Open login page
        loginPage.goToPracticeLoginPage()
        loginPage.forgotPasswordKnownEmail(browser.globals.email)
        
    },

    "Forgot Password - Invalid Email": function (browser) {
        const loginPage = browser.page.loginPage()

        //Open login page
        loginPage.goToPracticeLoginPage()
        loginPage.forgotPasswordUnknownEmail()
        
    },

    afterEach: function (browser) {
        browser.end();
    }
};