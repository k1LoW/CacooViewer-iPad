var win = Titanium.UI.currentWindow;

var image = Titanium.UI.createImageView({
                                            image:'images/cacoo_back.png'
                                        });
win.add(image);

var apiKey = '';


var a = Titanium.UI.createAlertDialog({
                                          title:'CacooViewer',
                                          message:'Please set API Key'
                                      });

Titanium.UI.currentWindow.addEventListener('focus', function(e) {
                                               if (Titanium.App.Properties.hasProperty('apiKey')) {
                                                   apiKey = Titanium.App.Properties.getString('apiKey');
                                               }

                                               //Titanium.API.debug('apiKey:' + apiKey);

                                               if (apiKey === '') {
                                                   a.buttonNames = null; // unset in case you did 2/3rd and then back to 1st
                                                   a.show();
                                               } else {

                                                   var xhr = Titanium.Network.createHTTPClient();

                                                   xhr.open('GET', 'https://cacoo.com/api/v1/diagrams.json?apiKey=' + apiKey);
                                                   xhr.onload = function () {
                                                       Titanium.API.debug(this.responseText);
                                                       var data = JSON.parse(this.responseText);

                                                       for (var i in data.result) {
                                                           data.result[i].hasChild = true;

                                                           if (data.result[i].security === 'private') {
                                                               data.result[i].leftImage = 'images/table_sheets_private.png';
                                                           } else {
                                                               data.result[i].leftImage = 'images/table_sheets.png';
                                                           }

                                                       }

                                                       var search = Titanium.UI.createSearchBar({
                                                                                                    showCancel:false
                                                                                                });

                                                       var tv = Titanium.UI.createTableView({ data : data.result,
                                                                                              search: search,
                                                                                              filterAttribute: 'title'
                                                                                            });

                                                       tv.addEventListener('click', function(e) {

                                                                               var w = Titanium.UI.createWindow({
                                                                                                                    title:'Main',
                                                                                                                    backgroundColor:'#fff'
                                                                                                                });

                                                                               var row = e.rowData;
                                                                               var b = Ti.UI.createButton({
                                                                                                               title:'Sheets',
                                                                                                               width:150,
                                                                                                               height:40
                                                                                                           });

                                                                               b.addEventListener('click', function() {
                                                                                                      w.close();
                                                                                                  });
                                                                               
                                                                               var diagrams = Ti.UI.createWindow({
                                                                                                                     title:row.title,
                                                                                                                     barColor:"#106ACD",
                                                                                                                     backgroundColor:'#fff',
                                                                                                                     url:'diagrams.js',
                                                                                                                     diagramId:row.diagramId,
                                                                                                                     leftNavButton:b
                                                                                                                 });

                                                                               var diagramNav = Ti.UI.iPhone.createNavigationGroup({
                                                                                                                                       window: diagrams
                                                                                                                                   });
                                                                               w.add(diagramNav);

                                                                               w.open({animate: true});
                                                                           });

                                                       win.add(tv);
                                                   };
                                                   xhr.send();
                                               }
                                           });