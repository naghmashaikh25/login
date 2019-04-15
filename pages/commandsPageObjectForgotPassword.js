const userInteractionPuaseTiming = 1000;
const puaseTiming = 7500;
const waitingForLoadTiming = 15000;

var util = require('util');

var forgotPasswordCommands = {
    
    loadPage: function() {
        return this.resizeWindow(1024, 800)
        .waitForElementVisible('body', waitingForLoadTiming)
    },
    loadSignDialog: function() {
        return  this.verify.visible('@signInBTN', 'Sign In button not visible')
        .click('@signInBTN')
        .pause(puaseTiming)

        .waitForElementVisible('@signInDialog', waitingForLoadTiming)
        .pause(puaseTiming)
    },
    loadForgetPasswordDialog: function(forgotBTNTitle) {
        return this.verify.containsText( '@forgotBTN', forgotBTNTitle)
        .click('@forgotBTN')
        .pause(puaseTiming)
    },
    fillForgetPasswordFormOnlyEmaild: function(emailValue) {
        return this.setValue('@resetEmail', emailValue)
    },
    fillForgetPasswordFormEmaildWithRegion: function(emailValue, regionData) {
        var regionSelector = this.regionID('@selectedRegion', regionData)
        return this.clearValue('@resetEmail')
                .click(regionSelector)
                .setValue('@resetEmail', emailValue)
    },
    actionOnResetPasswordButton: function() {
        return this.waitForElementVisible('@resetPasswordBTN', waitingForLoadTiming)
        .click('@resetPasswordBTN')
        .pause(userInteractionPuaseTiming)
    },
    validateErrorOnlyRegionEmpty: function(emailValue) {
       return this.verify.visible('@regionErrorTitle', 'Error message not visible')
                .verify.hidden('@errorMessage')
    },
    validateErrorOnlyEmailIdEmpty: function(errorText) {
        return this.verify.elementNotPresent('@regionErrorTitle')
                .verify.containsText( '@errorMessage', errorText)
                .verify.visible('@errorMessage')
    },
    validateErrorRegionAndEmailIdBothEmpty: function(errorText) {
        return this.verify.visible('@regionErrorTitle')
                .verify.containsText( '@errorMessage', errorText)
                .verify.visible('@errorMessage')
    },
    validateWithNoError: function() {
        return this.verify.elementNotPresent('@regionErrorTitle')
                .verify.hidden('@errorMessage')
    },
    removeForgetPasswordDialog: function() {
        return this.verify.visible('@backBTN')
                .pause(puaseTiming)
                .click('@backBTN')
    },
    regionID: function(elementName, data) {
        var element = this.elements[elementName.slice(1)];
        return util.format(element.selector, data);
    }

};

module.exports = {
    commands: [forgotPasswordCommands],
    url: function() {
        return this.api.launchUrl;
    },
    elements: {
        signInBTN: {
            selector: 'body > div.navigation > div > nav > button.login'
        },
        signInDialog: {
            selector: '.dialog__content'
        },
        forgotBTN: {
            selector: '.forgot'
        },
        resetEmail: {
            selector: '#resetEmail'
        },
        resetPasswordBTN: {
            selector: '#doResetpassword'
        },
        regionErrorTitle: {
            selector: '#passwordreset > div.regions.error'
        },
        backBTN: {
            selector: '#passwordreset > div.back'
        },
        errorMessage: {
            selector: '#passwordreset > div.progress-button > #errorMessage'
        },
        selectedRegion: {
            selector: '#passwordreset > div.regions > div.availableRegions > div:nth-child(%s)'
        }
    },

};
