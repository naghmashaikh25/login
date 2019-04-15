var util = require('util')

const puaseTiming = 7500;
const waitingForLoadTiming = 15000;

var selectors = {
    signInBTN: 'body > div.navigation > div > nav > button.login',
    signInDialog: '.dialog__content',
    regionBTN : '#userLogin > div.regions > div.availableRegions > div[data-region=%s]',
    emailTextField: '#email',
    passwordTextField: '#password',
    loginBTN: '#doLogin',
    loginErrorText: '#userLogin > div:nth-child(4) > div > div',
    userProfileBTN: '.userProfile',
    removeSignDialog :'#login > div.dialog__content > span',
    logoutBTN: '#portal-navigation > div > div.userProfile > div.dropdown > ul > li',
    logoutBTNIndex: '#portal-navigation > div > div.userProfile > div.dropdown > ul > li:nth-child(%s)'
};

var errorTextExpected = {
    loginError : 'Entered data are not valid. Please try again.'
};

var correctUserData = {
    'EU': [
           ['naghma.e1@gmail.com','1'],
           ['naghma.e2@gmail.com','1'],
           ['naghma.e3@gmail.com','1']
           ],
    'USA': [
            ['naghma.s1@gmail.com','1'],
            ['naghma.s2@gmail.com','1'],
            ['naghma.s3@gmail.com','1']
            ],
    'ASIA': [
             ['naghma.a1@gmail.com','1'],
             ['naghma.a2@gmail.com','1'],
             ['naghma.a3@gmail.com','1']
             ]
}

var invalidUserData = {
    'EU': [
           ['naghma.es1@gmail.com', 'qwerty'],
           ['naghma.es1@gmail.com', 'qwerty'],
           ['naghma.es1@gmail.com', '123qwe']
           ],
    'ASIA': [
             ['naghma.eqazs1@gmail.com', 'password2'],
             ['naghma.eqazs1@gmail.com', '123qwe'],
             ['naghma.eqazs1@gmail.com', 'qwerty']
             ],
    'USA': [
            ['naghma.est1@gmail.com', 'dataPassword2'],
            ['naghma.est1@gmail.com', 'qwerty'],
            ['naghma.est1@gmail.com', '123qwe']
            ]
}

var emptyEmailIDAndPassword = {
    'EU': [ '', '' ],
    'ASIA': [ '', '' ],
    'USA': [ '', '' ]
};

var emptyPassword = {
    'EU': [ 'naghma.eqazs1@gmail.com', '' ],
    'ASIA': [ 'naghma.eqazs22@gmail.com', '' ],
    'USA': [ 'naghma.eqazs41@gmail.com', '' ]
};

var emptyEmailID = {
    'EU': [ '', 'sample' ],
    'ASIA': [ '', 'sample' ],
    'USA': [ '', 'sample' ]
};

module.exports = {
    
    '@tags': ['loginSelectorObject'],

    'Selector Object: Successfully Login': function( _browser ) {

        _browser.resizeWindow(1024, 800);
        
        _browser.init()
        .waitForElementVisible('body', waitingForLoadTiming);

        for (regionData in correctUserData) {
            
            var regionSelector = util.format(selectors.regionBTN, regionData);
            var values = correctUserData[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i][0],
                password = values[i][1];
                
                _browser.verify.visible(selectors.signInBTN)
                _browser.click(selectors.signInBTN)
                
                _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming)
                _browser.click(regionSelector)
                _browser.pause(puaseTiming)
                
                _browser.setValue(selectors.emailTextField, emailID)
                _browser.setValue(selectors.passwordTextField, password)
                _browser.click(selectors.loginBTN)
                _browser.pause(waitingForLoadTiming)
                
                _browser.verify.elementNotPresent(selectors.loginErrorText)
                _browser.waitForElementVisible(selectors.userProfileBTN, waitingForLoadTiming)
                _browser.click(selectors.userProfileBTN)
                _browser.pause(puaseTiming)

                _browser.elements('css selector', selectors.logoutBTN, function(result) {

                                  var logoutSelector = util.format(selectors.logoutBTNIndex, result.value.length);
                                  _browser.waitForElementVisible(logoutSelector, waitingForLoadTiming)
//                                _browser.verify.visible(logoutSelector)
                                  .click(logoutSelector)
                                  .pause(puaseTiming)
                                  })
                _browser.pause(puaseTiming)
                
            }
        }
        
        _browser.end();

     },

    
    'Selector Object: Try to login with wrong user and password': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);

        _browser.init()
        .waitForElementVisible('body', 5000 )
        
        for (regionData in invalidUserData) {
            
            var regionSelector = util.format(selectors.regionBTN, regionData);
            var values = invalidUserData[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i][0],
                password = values[i][1];
                
                _browser.verify.visible(selectors.signInBTN)
                _browser.click(selectors.signInBTN)

                _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
                _browser.click(regionSelector);
                _browser.pause(puaseTiming);
                
                _browser.clearValue(selectors.emailTextField);
                _browser.clearValue(selectors.passwordTextField);
                
                _browser.setValue(selectors.emailTextField, emailID);
                _browser.setValue(selectors.passwordTextField, password);
                _browser.click(selectors.loginBTN);
                
                _browser.expect.element(selectors.loginErrorText).text.to.equal(errorTextExpected.loginError);
                _browser.verify.visible(selectors.loginErrorText)
                _browser.pause(puaseTiming)

                _browser.click(selectors.removeSignDialog);
                _browser.pause(puaseTiming);
            }
        }

        _browser.end();
    },


    'Selector Object: Try to login with no username and no password': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        
        _browser.init()
        .waitForElementVisible('body', 5000 )
        
        for (regionData in emptyEmailIDAndPassword) {
            
            var regionSelector = util.format(selectors.regionBTN, regionData);
            var values = emptyEmailIDAndPassword[regionData];

                var emailID = values[0],
                password = values[1];
                
                _browser.verify.visible(selectors.signInBTN)
                _browser.click(selectors.signInBTN)
                
                _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
                _browser.click(regionSelector);
                _browser.pause(puaseTiming);
                
                _browser.clearValue(selectors.emailTextField);
                _browser.clearValue(selectors.passwordTextField);
                
                _browser.setValue(selectors.emailTextField, emailID);
                _browser.setValue(selectors.passwordTextField, password);
                _browser.click(selectors.loginBTN);
                
                _browser.expect.element(selectors.loginErrorText).text.to.equal(errorTextExpected.loginError);
                _browser.pause(puaseTiming)
                
                _browser.click(selectors.removeSignDialog);
                _browser.pause(puaseTiming);
        }
        
        _browser.end();
    },
    
    
    'Selector Object: Try to login with no username': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        
        _browser.init()
        .waitForElementVisible('body', 5000 )
        
        for (regionData in emptyEmailID) {
            
            var regionSelector = util.format(selectors.regionBTN, regionData);
            var values = emptyEmailID[regionData];
            
            var emailID = values[0],
            password = values[1];
            
            _browser.verify.visible(selectors.signInBTN)
            _browser.click(selectors.signInBTN)
            
            _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
            _browser.click(regionSelector);
            _browser.pause(puaseTiming);
            
            _browser.clearValue(selectors.emailTextField);
            _browser.clearValue(selectors.passwordTextField);
            
            _browser.setValue(selectors.emailTextField, emailID);
            _browser.setValue(selectors.passwordTextField, password);
            _browser.click(selectors.loginBTN);
            
            _browser.expect.element(selectors.loginErrorText).text.to.equal(errorTextExpected.loginError);
            _browser.pause(puaseTiming)
            
            _browser.click(selectors.removeSignDialog);
            _browser.pause(puaseTiming);
        }
        
        _browser.end();
    },
    
    
    'Selector Object: Try to login with no password': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        
        _browser.init()
        .waitForElementVisible('body', 5000 )
        
        for (regionData in emptyPassword) {
            
            var regionSelector = util.format(selectors.regionBTN, regionData);
            var values = emptyPassword[regionData];
            
            var emailID = values[0],
            password = values[1];
            
            _browser.verify.visible(selectors.signInBTN)
            _browser.click(selectors.signInBTN)
            
            _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
            _browser.click(regionSelector);
            _browser.pause(puaseTiming);
            
            _browser.clearValue(selectors.emailTextField);
            _browser.clearValue(selectors.passwordTextField);
            
            _browser.setValue(selectors.emailTextField, emailID);
            _browser.setValue(selectors.passwordTextField, password);
            _browser.click(selectors.loginBTN);
            
            _browser.expect.element(selectors.loginErrorText).text.to.equal(errorTextExpected.loginError);
            _browser.pause(puaseTiming)
            
            _browser.click(selectors.removeSignDialog);
            _browser.pause(puaseTiming);
        }
        
        _browser.end();
    },

    
}