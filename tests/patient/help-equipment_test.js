module.exports = {
    "Help links - Verify all help information": function (browser) {
        const landingPage = browser.page.patient.landingPage()

        landingPage.accessLandingPage(browser.globals.email, browser.globals.password)
        landingPage.selectHelp()
        // Verify all texts and links from help modal
        landingPage.checkHelpModal()
    },

    "Equipment Test - Verify the service can be opened": function (browser) {
        const landingPage = browser.page.patient.landingPage()

           landingPage.accessLandingPage(browser.globals.email, browser.globals.password)
            landingPage.selectEquipmentTest()
            // Click in menu item and verify if the link opened is the expected one
            landingPage.checkNewTabLink('https://tokbox.com/developer/tools/precall/results')
    },

    afterEach: function (browser) {
        browser.end();
    }
};