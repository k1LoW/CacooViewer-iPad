var win = Titanium.UI.currentWindow;
var apiKey = '';

if (Titanium.App.Properties.hasProperty('apiKey')) {
    apiKey = Titanium.App.Properties.getString('apiKey');
}

var apiKeyContent = Titanium.UI.createView({
                                             top:90,
                                             width:300,
                                             height:'auto'
                                         });


var apiKeyLabel = Titanium.UI.createLabel({
                                              color:'#333',
                                              text:'API Key',
                                              font:{fontSize:16,fontFamily:'Helvetica Neue'},
                                              top:0,
                                              left:0,
                                              width:250,
                                              height:'auto'
                                          });

apiKeyContent.add(apiKeyLabel);

var apiKeyCacoo = Titanium.UI.createView({
                                             backgroundImage: 'images/apikey.png',
                                             top:28,
                                             right:3,
                                             width:35,
                                             height:35
                                         });

apiKeyCacoo.addEventListener('singletap', function() {
                             Titanium.Platform.openURL('https://cacoo.com/profile/api');
                          });

apiKeyContent.add(apiKeyCacoo);

var apiKeyField = Titanium.UI.createTextField({
                                                  value:apiKey,
                                                  color:'#336699',
                                                  hintText:'API Key',
                                                  height:35,
                                                  top:30,
                                                  left:0,
                                                  width:250,
                                                  borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
                                              });

apiKeyField.addEventListener('return',function(e)
                             {
                                 if (e.value) {
                                     Titanium.App.Properties.setString('apiKey', e.value);
                                 }
                                 apiKeyField.blur();
                             });

apiKeyField.addEventListener('focus',function(e)
                             {
                                 if (e.value) {
                                     Titanium.App.Properties.setString('apiKey', e.value);
                                 }
                             });

apiKeyField.addEventListener('blur',function(e)
                             {
                                 if (e.value) {
                                     Titanium.App.Properties.setString('apiKey', e.value);
                                 }
                             });

apiKeyField.addEventListener('change', function(e)
                             {
                                 if (e.value) {
                                     Titanium.App.Properties.setString('apiKey', e.value);
                                 }
                             });

apiKeyContent.add(apiKeyField);


var b = Ti.UI.createButton({
                               title:'Close',
                               top: 90,
                               width:130,
                               height:40
                           });
b.addEventListener('click', function() {
                       win.close();
                   });

apiKeyContent.add(b);

win.add(apiKeyContent);


/*
 var info = Titanium.UI.createButton({
 systemButton:Titanium.UI.iPhone.SystemButton.INFO_LIGHT
 });

 info.addEventListener('click', function(e) {
 var infoW = Ti.UI.createWindow({
 backgroundColor:'#fff'
 });

 infoW.addEventListener('click', function(e) {
 infoW.close();
 this.close();
 });

 var image = Titanium.UI.createImageView({
 image:'images/101000lab.png'
 });
 infoW.add(image);
 infoW.open();

 });

 win.rightNavButton = info;
 */