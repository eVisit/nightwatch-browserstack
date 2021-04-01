module.exports = {
    "Edit Insurance information Successfully": function (browser) {
        const insurancePage = browser.page.patient.my_account.insurancePage()

        insurancePage.accessInsurancePage(browser.globals.email, browser.globals.password)
        insurancePage.openNewInsurance()
        insurancePage.checkToastAgreementRequired()
        insurancePage.checkToastDontUseInsurance()
        insurancePage.openNewInsurance()
        insurancePage.addNewInsurance()

    },

    afterEach: function (browser) {
        browser.end();
    }
};