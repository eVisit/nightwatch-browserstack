module.exports = {
    "Edit Billing information Successfully": function (browser) {
        const paymentMethodPage = browser.page.patient.my_account.paymentMethodPage()

        //Open billing page page
        paymentMethodPage.accessPaymentMethodPage(browser.globals.email, browser.globals.password)
        
        //Delete any item already saved
        paymentMethodPage.eraseRegisteredCard()

        //Check toast messages
        paymentMethodPage.checkToastFieldsRequired()
        paymentMethodPage.checkToastNameRequired()
        paymentMethodPage.checkToastNumberRequired()
        paymentMethodPage.checkToastNumberInvalid()
        paymentMethodPage.checkToastDateRequired()
        paymentMethodPage.checkToastDateInvalid() 
        paymentMethodPage.checkToastDateExpired() 
        paymentMethodPage.checkToastCvcRequired()
        paymentMethodPage.checkToastCvcInvalid()

        //check CVC modal
        paymentMethodPage.checkCvcHelpModal()

        //save new card
        paymentMethodPage.saveNewCreditCard()

    },

    afterEach: function (browser) {
        browser.end();
    }
};