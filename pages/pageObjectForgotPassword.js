var util = require('util')

module.exports = {
    
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
    
    commands: [{
          regionID: function(elementName, data) {
              var element = this.elements[elementName.slice(1)];
                return util.format(element.selector, data);
              }
          }]
};
