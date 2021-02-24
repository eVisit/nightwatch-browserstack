const elements = {

    btnUserProfile: `[data-test-id='userProfileButton']`,

    // Alert banner on top if alert/success/failed action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,

    // Personal page items
    firstName: `[data-test-id='firstName']`,
    middleName: `[data-test-id='middleName']`,
    lastName: `[data-test-id='lastName']`,
    addressLine1: `[data-test-id='addressLine1']`,
    addressLine2: `[data-test-id='addressLine2']`,
    city: `[data-test-id='city']`,
    state: `[data-test-id="state"]`,
    zipCode: `[data-test-id="zipCode"]`,
    phoneCell: `[data-test-id="phoneCell"]`,
    state: `input[data-test-id="state"]`,
    dateOfBirth: `[data-test-id="dob"]`,
    gender: `[data-test-id="gender"][name="sex"]`,
    timeZone: `[data-test-id="timeZoneSelect"][name="timezone"]`,
    btnContinue: `[data-test-id="continue"]`,
};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible(`@firstName`, 15000)
    },

    /*
    *   Open the combobox and select a specific option inside
    *   Input: The locator of the combobox and the value of the locator of the element that should be selected
    */
    editComboboxField(locator, value) {
        return this
            .click(locator)
            .waitForElementVisible(`[data-test-id="${value}"]`)
            .click(`[data-test-id="${value}"]`)
    },

    /*
    *   Check the failed toast message after each field is filled up and submitted
    *   Input: Each field of the personal info page, including combobox items and toast message expected
    */
    checkPersonalInfoFailureMessage(firstNameValue, middleNameValue, lastNameValue,
        addressLine1Value, addressLine2Value, cityValue, stateValue, zipCodeValue,
        phoneCellValue, dateOfBirthValue, genderValue, timeZoneValue,
        message) {
        this
            .waitForElementVisible(`@firstName`, 15000)
            .editTextField('@firstName', firstNameValue)
            .editTextField('@middleName', middleNameValue)
            .editTextField('@lastName', lastNameValue)
            .editTextField('@addressLine1', addressLine1Value)
            .editTextField('@addressLine2', addressLine2Value)
            .editTextField('@city', cityValue)

        // Used to check if the combobox should be used for a specific field
        if (stateValue != "") {
            this.editComboboxField('@state', stateValue)
        }

        this.editTextField('@zipCode', zipCodeValue)
            .editTextField('@phoneCell', phoneCellValue)
            .editTextField('@dateOfBirth', dateOfBirthValue)

        if (genderValue != "") {
            this.editComboboxField('@gender', genderValue)
        }

        if (timeZoneValue != "") {
            this.editComboboxField('@timeZone', timeZoneValue)
        }

        this.click('@btnContinue')

            .checkToastMessage(message)
            .pause(500)
            .click('@btnCloseToast')
            .waitForElementNotPresent('@toast')

        return this
    },

    /*
    *   Run several attempts of filling up the personal info with wrong information and check alert message
    *   Input: None
    */
    personalInfoFailureMessages() {
        this
            // All fields empty
            .checkPersonalInfoFailureMessage("", "", "",
                "", "", "", "", "",
                "", "", "", "",
                "There is more than one field that is required.")

            // State combobox without answer
            .checkPersonalInfoFailureMessage("First Name Edited", "Middle Name Edited", "Last Name Edited",
                "Address 1 Edited", "Address 2 Edited", "City Edited", "", "12345",
                "480-289-1576", "09/06/1990", "femaleOption", "AmericaNoronha020200Option",
                "State can't be blank.")

            // First name empty
            .checkPersonalInfoFailureMessage("", "Middle Name Edited", "Last Name Edited",
                "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "12345",
                "480-289-1576", "09/06/1990", "femaleOption", "AmericaNoronha020200Option",
                "Value required for First Name.")

            // Address 1 empty
            .checkPersonalInfoFailureMessage("First Name Edited", "Middle Name Edited", "Last Name Edited",
                "", "Address 2 Edited", "City Edited", "WyomingOption", "12345",
                "480-289-1576", "09/06/1990", "femaleOption", "AmericaNoronha020200Option",
                "Address can't be blank.")

            // Zip code empty
            .checkPersonalInfoFailureMessage("First Name Edited", "Middle Name Edited", "Last Name Edited",
                "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "",
                "480-289-1576", "09/06/1990", "femaleOption", "AmericaNoronha020200Option",
                "Zip code can't be blank.")

            // Zip code with wrong number of digits (3 instead of 5 or 8)
            .checkPersonalInfoFailureMessage("First Name Edited", "Middle Name Edited", "Last Name Edited",
                "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "123",
                "480-289-1576", "09/06/1990", "femaleOption", "AmericaNoronha020200Option",
                "Zip code must be 5 or 9 digits long.")

            // Phone number with invalid number
            .checkPersonalInfoFailureMessage("First Name Edited", "Middle Name Edited", "Last Name Edited",
                "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "12345",
                " 480-289-15", "09/06/1990", "femaleOption", "AmericaNoronha020200Option",
                "Invalid phone number.")

            // Age corresponding to under age person
            .checkPersonalInfoFailureMessage("First Name Edited", "Middle Name Edited", "Last Name Edited",
                "Address 1 Edited", "Address 2 Edited", "City Edited", "WyomingOption", "12345",
                "480-289-1576", "09/06/2015", "femaleOption", "AmericaNoronha020200Option",
                "Age must be 18 or above.")

        return this
    },

    /*
    *   fill up all necessary fields and go to next page
    *   Input: Each field of the personal info page, including combobox items and toast message expected
    */
    confirmPersonalInfo(firstNameValue, middleNameValue, lastNameValue,
        addressLine1Value, addressLine2Value, cityValue, stateValue, zipCodeValue,
        phoneCellValue, dateOfBirthValue, genderValue, timeZoneValue) {
        this
            .waitForElementVisible(`@firstName`, 15000)

            .editTextField('@firstName', firstNameValue)
            .editTextField('@middleName', middleNameValue)
            .editTextField('@lastName', lastNameValue)
            .editTextField('@addressLine1', addressLine1Value)
            .editTextField('@addressLine2', addressLine2Value)
            .editTextField('@city', cityValue)
            .editComboboxField('@state', stateValue)
            .editTextField('@zipCode', zipCodeValue)
            .editTextField('@phoneCell', phoneCellValue)
            .editTextField('@dateOfBirth', dateOfBirthValue)
            .editComboboxField('@gender', genderValue)
        // Used to keep the timezone as default but allowing change if desired
        if (timeZoneValue != "") {
            this.editComboboxField('@timeZone', timeZoneValue)
        }
        this.click('@btnContinue')

            .checkToastMessage("Personal Info updated.")
            .waitForElementNotPresent('@toast',10000)

        return this
    },

}];

module.exports = {
    elements: elements,
    commands: commands
}