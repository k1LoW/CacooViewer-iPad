// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var apiKey = '';

if (Titanium.App.Properties.hasProperty('apiKey')) {
    apiKey = Titanium.App.Properties.getString('apiKey');
}

//
// create base UI nav and root window
//
var win = Titanium.UI.createWindow({
                                       title:'Main',
                                       backgroundColor:'#fff'
                                   });

//
// create controls tab and root window
//
var setting = Titanium.UI.createWindow({
                                           title:'Setting',
                                           barColor:"#106ACD",
                                           backgroundColor:'#fff',
                                           url: 'setting.js',
                                           modal: true
                                           //modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
                                       });

// button
var btnSetting = Ti.UI.createButton({
                               backgroundImage:'images/setting.png',
                               width:33,
                               height:33
                           });

btnSetting.addEventListener('click', function() {
                       setting.open();
                   });

// button
var btnReload = Ti.UI.createButton({
                                       systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
                           });

btnReload.addEventListener('click', function() {
                               sheets.fireEvent('focus');
                   });

var sheets = Titanium.UI.createWindow({
                                          title:'Sheets',
                                          barColor:"#106ACD",
                                          backgroundColor:'#fff',
                                          leftNavButton:btnReload,
                                          rightNavButton:btnSetting,
                                          url:'sheets.js'
                                      });

//
var sheetNav = Ti.UI.iPhone.createNavigationGroup({
                                                      window: sheets
                                                  });

win.add(sheetNav);

// open window
setTimeout(function() {
               win.open({fullscreen: false,
                         animate: true});
           }, 2000);
