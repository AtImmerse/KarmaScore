var app = (function() {
    "use strict";
    
    var app = {
        initialize: function () {
            this.bindEvents();
        },
        bindEvents: function () {
            if (window.cordova !== undefined) {
                console.log('Cordova found, wating for device.');
                document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            } else {
                console.log('Cordova not found, booting application');
                window.addEventListener('load', this.onDeviceReady.bind(this), false);
                // this.receivedEvent('deviceready');
            }

            // Handle the Cordova pause and resume events
            document.addEventListener('pause', this.onPause.bind(this), false);
            document.addEventListener('resume', this.onResume.bind(this), false);

        },
        onPause: function () {
             // TODO: This application has been suspended. Save application state here.
        },
        onResume: function() {
            // TODO: This application has been reactivated. Restore application state here.
        },
        onDeviceReady: function () {
            app.receivedEvent('deviceready');

            window.sqlitePlugin.openDatabase({ name: 'KarmaScore.db', location: 'default', createFromLocation: 1 }, function (db) {
                db.transaction(function (tx) {
                    tx.executeSql("SELECT * FROM QUESTIONBANK", [], function (tx, res) {
                        console.log("stringify: " + JSON.stringify(res.rows.item(0)));
                        //alert("stringify: " + JSON.stringify(res.rows.item(0).Description));
                    });

                }, function (err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                });
            });
            
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            var element = document.getElementById("deviceready");
            element.innerHTML = '<a href="qaQuestion.html" > Lets start your QA & get the score !!! </a>';
            element.className += ' ready';
        },
        receivedEvent: function (id) {
            console.log('Received Event: ' + id);
        }
    };
    app.initialize();
    return app;
})();
