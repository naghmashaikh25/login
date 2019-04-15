require('events').EventEmitter.prototype._maxListeners = 100;

const userInteractionPuaseTiming = 1000;
const puaseTiming = 7500;
const waitingForLoadTiming = 15000;

var errorTextExpected = {
    loginError : 'Entered data are not valid. Please try again.'
};

var correctUserData = {
    '2': [
          ['naghma.e1@gmail.com','1'],
          ['naghma.e2@gmail.com','1'],
          ['naghma.e3@gmail.com','1']
          ],
    '1': [
          ['naghma.s1@gmail.com','1'],
          ['naghma.s2@gmail.com','1'],
          ['naghma.s3@gmail.com','1']
          ],
    '3': [
          ['naghma.a1@gmail.com','1'],
          ['naghma.a2@gmail.com','1'],
          ['naghma.a3@gmail.com','1']
          ]
}

var invalidUserData = {
    '2': [
          ['naghma.es1@gmail.com', 'qwerty'],
          ['naghma.es1@gmail.com', 'qwerty'],
          ['naghma.es1@gmail.com', '123qwe']
          ],
    '3': [
          ['naghma.eqazs1@gmail.com', 'password2'],
          ['naghma.eqazs1@gmail.com', '123qwe'],
          ['naghma.eqazs1@gmail.com', 'qwerty']
          ],
    '1': [
          ['naghma.est1@gmail.com', 'dataPassword2'],
          ['naghma.est1@gmail.com', 'qwerty'],
          ['naghma.est1@gmail.com', '123qwe']
          ]
}

var emptyEmailIDAndPassword = {
    '3': [ '', '' ],
    '2': [ '', '' ],
    '1': [ '', '' ]
};

var emptyPassword = {
    '2': [ 'naghma.eqazs1@gmail.com', '' ],
    '3': [ 'naghma.eqazs22@gmail.com', '' ],
    '1': [ 'naghma.eqazs41@gmail.com', '' ]
};

var emptyEmailID = {
    '3': [ '', 'sample' ],
    '2': [ '', 'sample' ],
    '1': [ '', 'sample' ]
};


module.exports = {
    
    '@tags': ['commandLoginPageObject'],

    'Command Page Object: Successfully Login': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
            .waitForElementVisible('body', waitingForLoadTiming);
        
        var login = _browser.page.commandsPageObjectLogin();
        login.navigate()
        
        for (regionData in correctUserData) {

            var values = correctUserData[regionData];
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i][0],
                password = values[i][1];
                
                login.loadSignDialog()
                    .clearForm()
                    .fillSignFormEmaildPasswordRegion(emailID, password, regionData)
                    .actionOnLoginButton()
                    .validateWithNoError()
                    .openProfileMenu();

                
                var logoutBTN = login.getMenuItemSelector()
                _browser.elements('css selector', logoutBTN, function(result) {
                                  console.log(result.value.length)
                                        login.actionOnLogoutButton(result.value.length)
                                  })
            }
        }
        
        _browser.end();
        
    },

    
    'Command Page Object: Try to login with wrong user and password': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
        .waitForElementVisible('body', waitingForLoadTiming);
        
        var login = _browser.page.commandsPageObjectLogin();
        login.navigate()
        
        for (regionData in invalidUserData) {
            
            var values = invalidUserData[regionData];
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i][0],
                password = values[i][1];

                login.loadSignDialog()
                    .clearForm()
                    .fillSignFormEmaildPasswordRegion(emailID, password, regionData)
                    .actionOnLoginButton()
                    .validateErrorWrongEmailandPassword(errorTextExpected.loginError)
                    .removeSignInDialog()
            }
        }
        
        _browser.end();
    },
    
    
    'Command Page Object: Try to login with no username and no password': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
        .waitForElementVisible('body', waitingForLoadTiming);
        
        var login = _browser.page.commandsPageObjectLogin();
        login.navigate()
        
        for (regionData in emptyEmailIDAndPassword) {
            
            var values = emptyEmailIDAndPassword[regionData];
            var emailID = values[0],
            password = values[1];

            login.loadSignDialog()
                .clearForm()
                .fillSignFormEmaildPasswordRegion(emailID, password, regionData)
                .actionOnLoginButton()
                .validateErrorNoEmailandNoPassword(errorTextExpected.loginError)
                .removeSignInDialog()
        }
        
        _browser.end();

    },
    
    
    'Command Page Object: Try to login with no emailid': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
        .waitForElementVisible('body', waitingForLoadTiming);
        
        var login = _browser.page.commandsPageObjectLogin();
        login.navigate()

        for (regionData in emptyEmailID) {
            
            var values = emptyEmailID[regionData];
            var emailID = values[0],
            password = values[1];
            
            login.loadSignDialog()
                .clearForm()
                .fillSignFormEmaildPasswordRegion(emailID, password, regionData)
                .actionOnLoginButton()
                .validateErrorNoEmail(errorTextExpected.loginError)
                .removeSignInDialog()
        }
        
        _browser.end();

    },
    
    
    'Command Page Object: Try to login with no password': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
        .waitForElementVisible('body', waitingForLoadTiming);
        
        var login = _browser.page.commandsPageObjectLogin();
        login.navigate()
        
        for (regionData in emptyPassword) {
            
            var values = emptyPassword[regionData];
            var emailID = values[0],
            password = values[1];
            
            login.loadSignDialog()
                .clearForm()
                .fillSignFormEmaildPasswordRegion(emailID, password, regionData)
                .actionOnLoginButton()
                .validateErrorNoPassword(errorTextExpected.loginError)
                .removeSignInDialog()
        }
        
        _browser.end();

    },

}