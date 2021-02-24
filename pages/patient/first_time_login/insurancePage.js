const elements = {

    btnUserProfile: `[data-test-id='userProfileButton']`,

    // Alert banner on top if alert/success/failed action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    // Insurance items
    btnBack: `[data-test-id="back"]`,
    btnAddInsuranceYes: `[data-test-id="yes"]`,
    btnAddInsuranceNo: `[data-test-id="no"]`,

    // Add Insurance items
    insuranceCompanyField: `[data-test-id="question1"]`,
    relationPolicyHolderComboBox: `[data-test-id="question2"]`,
    idNumberField: `[data-test-id="question6"]`,
    groupNumerField: `[data-test-id="question7"]`,
    policyTypeComboBox: `[data-test-id="question8"]`,
    insurancePhoneField: `[data-test-id="question9"]`,
    agreementCheckBox: `[data-test-id="acceptAgreement"]`,
    btnUpdate: `[data-test-id="updateInsurance"]`,

    // Insurance name option
    // This ID only applies for the exact text "Automation Insurance Test", since the ID is generated dinamically for any text used
    insuranceCompanyText: `[data-test-id="NotundefinednFileAutomationInsuranceTestOption"]`,

    // Policy Holder relationship options
    relationPolicyHolderOption1: `[data-test-id="SelfOption"]`,
    relationPolicyHolderOption2: `[data-test-id="SpouseOption"]`,
    relationPolicyHolderOption3: `[data-test-id="FatherOption"]`,
    relationPolicyHolderOption4: `[data-test-id="MotherOption"]`,
    relationPolicyHolderOption5: `[data-test-id="BrotherOption"]`,
    relationPolicyHolderOption6: `[data-test-id="SisterOption"]`,
    relationPolicyHolderOption7: `[data-test-id="AuntOption"]`,
    relationPolicyHolderOption8: `[data-test-id="UncleOption"]`,
    relationPolicyHolderOption9: `[data-test-id="GrandfatherOption"]`,
    relationPolicyHolderOption10: `[data-test-id="GrandmotherOption"]`,
    relationPolicyHolderOption11: `[data-test-id="SonOption"]`,
    relationPolicyHolderOption12: `[data-test-id="DaughterOption"]`,
    relationPolicyHolderOption13: `[data-test-id="LegalundefinedustodianundefineduardianOption"]`,

    // Policy types options
    policyTypeOption1: `[data-test-id="EPOOption"]`,
    policyTypeOption1: `[data-test-id="HDHPOption"]`,
    policyTypeOption1: `[data-test-id="HMOOption"]`,
    policyTypeOption1: `[data-test-id="POSOption"]`,
    policyTypeOption1: `[data-test-id="PPOOption"]`,
    policyTypeOption1: `[data-test-id="OtherOption"]`,
};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible(`@btnAddInsuranceYes`, 15000)
    },

    /*
    *   Try to add a new insurance company without name
    *   Input: None
    */
    checkEmptyCompanyNameFailureMessage() {
        this
            .waitForElementVisible(`@btnAddInsuranceYes`, 15000)
            .click('@btnAddInsuranceYes')
            .waitForElementVisible('@insuranceCompanyField', 5000)
            .pause(500)
            .click('@btnUpdate')

            // The expected toast message
            .checkToastMessage("Value required for Insurance Company.")
            .click('@btnCloseToast')

            .click('@btnBack') // Back
            .waitForElementVisible('@btnAddInsuranceYes', 5000)
        return this
    },

    /*
    *   This function will test the toast message when the user does not include all necessary info
    *   Input: None
    */
    checkAgreementRequiredFailureMessage() {
        return this
            .waitForElementVisible(`@btnAddInsuranceYes`, 15000)
            .click('@btnAddInsuranceYes')
            .waitForElementVisible('@insuranceCompanyField', 5000)
            .editTextField('@insuranceCompanyField', "Automation Insurance Test")
            .waitForElementVisible('@insuranceCompanyText', 5000)
            .click('@insuranceCompanyText')
            .waitForElementVisible('@idNumberField')
            .click('@btnUpdate')

            // The expected toast message
            .checkToastMessage("There is more than one field that is required.")
            .click('@btnCloseToast')
            .waitForElementNotPresent('@toast')

            .click('@btnBack') // Back
            .waitForElementVisible('@btnAddInsuranceYes', 5000)
    },

    /*
    *   Open the combobox and select a specific option inside
    *   Input: The locator of the combobox and the value of the locator of the element that should be selected
    */
    editComboboxField(locator, value) {
        return this
            .click(locator)
            .waitForElementVisible(value)
            .click(value)
    },

    /*
    *   Add new insurance using pre-defined and valid values
    *   Input: None
    */
    addNewInsurance() {
        this
            // Check if page is open
            .waitForElementVisible(`@btnAddInsuranceYes`, 15000)
            .click('@btnAddInsuranceYes')
            .waitForElementVisible('@insuranceCompanyField', 5000)

            // Add new insurance company name and select it in the list
            .editTextField('@insuranceCompanyField', "Automation Insurance Test")
            .waitForElementVisible('@insuranceCompanyText', 5000)
            .click('@insuranceCompanyText')
            .waitForElementVisible('@idNumberField')

            // Add all other fields that appeared on the screen
            .editComboboxField('@relationPolicyHolderComboBox', '@relationPolicyHolderOption1')
            .editTextField('@idNumberField', "123")
            .editTextField('@groupNumerField', "321")
            .editComboboxField('@policyTypeComboBox', '@policyTypeOption1')
            .editTextField('@insurancePhoneField', "555-555-5555")

            .click('@agreementCheckBox')
            .click('@btnUpdate')
        return this
    },


}];

module.exports = {
    elements: elements,
    commands: commands
}