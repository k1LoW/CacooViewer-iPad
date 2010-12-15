var win = Titanium.UI.currentWindow;

win.backgroundColor = '#FFF';

var image = Titanium.UI.createImageView({
                                            image:'images/cacoo_back.png'
                                        });

win.add(image);


Titanium.API.debug(win.diagramId);

// initialize to all modes
win.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

var apiKey = '';

if (Titanium.App.Properties.hasProperty('apiKey')) {
    apiKey = Titanium.App.Properties.getString('apiKey');
}

if (apiKey !== '') {

    //Titanium.API.debug('apiKey:' + apiKey);

    var xhr = Titanium.Network.createHTTPClient();

    xhr.open('GET', 'https://cacoo.com/api/v1/diagrams/' + win.diagramId + '.json?apiKey=' + apiKey);
    xhr.onload = function () {
        Titanium.API.debug(this.responseText);
        var data = JSON.parse(this.responseText);


        // orientation change listener
        //
        Ti.Gesture.addEventListener('orientationchange',function(e) {
                                        // get orienation from event object
                                        var orientation = getOrientation(e.orientation);
                                    });

        var diagrams = [];
        var leftImage = '';
        var count = 0;
        for (var i in data.sheets) {
            if (data.security === 'private') {
                leftImage = 'images/table_diagram_private.png';
            } else {
                leftImage = 'images/table_diagram.png';
            }
            diagrams.push({
                              title :data.sheets[i].name,
                              hasChild : true,
                              no : count,
                              leftImage : leftImage ,
                              imageUrlForApi : data.sheets[i].imageUrlForApi
                          });
            count++;
        }

        var search = Titanium.UI.createSearchBar({
                                                     showCancel:false
                                                 });

        var tv = Titanium.UI.createTableView({ data : diagrams,
                                               search: search,
                                               filterAttribute: 'title'
                                             });
        var index = 0;
        tv.addEventListener('click', function(e) {
                                var row = e.rowData;

                                var btnPagination = Titanium.UI.createButtonBar({
                                                                                    labels:[' Prev ', ' Next '],
                                                                                    backgroundColor:"#106ACD"
                                                                                });

                                btnPagination.addEventListener('click', function(e) {
                                                                   if (e.index == 0) {
                                                                       if (index != 0) {
                                                                           index--;
                                                                       } else {
                                                                           index = count - 1;
                                                                       }
                                                                   } else if (e.index == 1) {
                                                                       if (index < count -1) {
                                                                           index++;
                                                                       } else {
                                                                           index = 0;
                                                                       }
                                                                   }

                                                                   var html = '<html><head><title>' + diagrams[index].title + '</title><meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 10.0" /> <meta name="apple-mobile-web-app-capable" content="yes" />' +
                                                                       '<link rel="stylesheet" href="lib/view.css" />' +
                                                                       '<script src="lib/jquery-1.4.4.min.js"></script>' +
                                                                       '<script type="text/javascript">' +
                                                                       'var diagrams = ' + JSON.stringify(diagrams) + ';' +
                                                                       'var no = ' + diagrams[index].no + ';' +
                                                                       'var apiKey = ' + apiKey + ';' +
                                                                       '</script>' +
                                                                       '<script src="lib/view.js"></script>' +
                                                                       '</head>' +
                                                                       '<body>' +
                                                                       '<div id="loader">Loading...</div>' +
                                                                       '<div id="content" data-role="page">' +
                                                                       '<img id="diagram" width="100%" src="' + diagrams[index].imageUrlForApi + '?apiKey=' + apiKey + '" /></div></body></html>';
                                                                   diagram.html = html;
                                                               });


                                var diagram = Ti.UI.createWebView();
                                var html = '<html><head><title>' + diagrams[index].title + '</title><meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 10.0" /> <meta name="apple-mobile-web-app-capable" content="yes" />' +
                                    '<link rel="stylesheet" href="lib/view.css" />' +
                                    '<script src="lib/jquery-1.4.4.min.js"></script>' +
                                    '<script type="text/javascript">' +
                                    'var diagrams = ' + JSON.stringify(diagrams) + ';' +
                                    'var no = ' + diagrams[index].no + ';' +
                                    'var apiKey = ' + apiKey + ';' +
                                    '</script>' +
                                    '<script src="lib/view.js"></script>' +
                                    '</head>' +
                                    '<body>' +
                                    '<div id="loader">Loading...</div>' +
                                    '<div id="content" data-role="page">' +
                                    '<img id="diagram" width="100%" src="' + diagrams[index].imageUrlForApi + '?apiKey=' + apiKey + '" /></div></body></html>';
                                diagram.html = html;

                                diagram.addEventListener('load', function(e) {
                                                             w.setRightNavButton(btnPagination);
                                                         });

                                Titanium.API.debug('count:' + count);

                                var i = row.no;

                                var b = Ti.UI.createButton({
                                                               title:win.title,
                                                               width:150,
                                                               height:40
                                                           });

                                b.addEventListener('click', function() {
                                                       d.close();
                                                   });

                                var btnSpinner = Ti.UI.createButton({
                                                                        systemButton:Titanium.UI.iPhone.SystemButton.SPINNER
                                                                    });

                                var w = Ti.UI.createWindow({title:row.title,
                                                            barColor:"#106ACD",
                                                            leftNavButton:b,
                                                            rightNavButton:btnSpinner
                                                           });
                                w.add(diagram);


                                var dNav = Ti.UI.iPhone.createNavigationGroup({
                                                                                  window: w
                                                                              });

                                var d = Ti.UI.createWindow({
                                                               title:row.title
                                                           });
                                d.add(dNav);

                                d.open();
                            });

        win.add(tv);


    };
    xhr.send();
}