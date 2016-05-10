var app = (function() {
    "use strict";
    var q;
    
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
                        q = res;
                        //alert("stringify: " + JSON.stringify(q.rows.item(0).Description));
                        $('.question').text(q.rows.item(0).Description);
                    });

                }, function (err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
                });
            });
            
            //alert( "Handler for .click() called." + q);
            
            $('.QA').show();
            
            var count = 0;
            $("#next").click(function() {
  	           //alert( "Handler for .click() called." + q);
            	count++;
            	if(count > 5){
            		$('#next').html('<div id="next"><a href="qaScoreCard.html" >Next</a</div>');                   
            		//alert("Score:753");
            	}
  	           $('.question').text(q.rows.item(count).Description);
             });

        },
        receivedEvent: function (id) {
            console.log('Received Event: ' + id);
        }
    };
    app.initialize();
    return app;
})();
