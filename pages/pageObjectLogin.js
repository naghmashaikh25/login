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
        regionBTN: {
            selector: '#userLogin > div.regions > div.availableRegions > div:nth-child(%s)'
        },
        emailTextField: {
            selector: '#email'
        },
        passwordTextField: {
            selector: '#password'
        },
        loginBTN: {
            selector: '#doLogin'
        },
        loginErrorText: {
            selector: '#userLogin > div:nth-child(4) > div > div'
        },
        userProfileBTN: {
            selector: '.userProfile'
        },
        logoutBTN: {
            selector: '#portal-navigation > div > div.userProfile > div.dropdown > ul > li'
        },
        logoutBTNIndex: {
            selector: '#portal-navigation > div > div.userProfile > div.dropdown > ul > li:nth-child(%s)'
        },
        removeSignDialog: {
            selector: '#login > div.dialog__content > span'
        }
    },

    commands: [{
           regionID: function(elementName, data) {
               var element = this.elements[elementName.slice(1)];
                    return util.format(element.selector, data);
               }
           },
               {
               logoutBTNId: function(elementName, data) {
               var element = this.elements[elementName.slice(1)];
               return util.format(element.selector, data);
               }
               }
               ]

};
