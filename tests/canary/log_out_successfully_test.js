module.exports = {

    beforeEach: function (browser) {
        browser.session(function(session) {
            console.log(session.sessionId);
          });
          
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
    console.log("Test Complete")
}
};