// init globals
var REFRESH_DELAY               = 5; // minutes
var MOODLE_AUTH_URL             = "https://moodle2.cs.huji.ac.il/nu20/auth/saml/index.php";
var MOODLE_LOGGED_IN_REDIRECT   = "https://moodle2.cs.huji.ac.il/nu20/parent_reload.php";

(function() {
    // we are using the chrome namespace instead of browser even though it is not standard,
    // simply because Firefox supports these namespace and chrome is a bully.

    // setup alarm
    chrome.alarms.clearAll();
    chrome.alarms.onAlarm.addListener((alarm) => {
        // sanity I guess
        if (alarm.name != "remoodle") {
            return;
        }

        // just poll
        fetch(MOODLE_AUTH_URL)
            .then(function (response) {
                // log some stuff
                if (response.url == MOODLE_LOGGED_IN_REDIRECT) {
                    console.log("Login refreshed...");
                } else {
                    console.log("Probably not logged in? Got url " + response.url);
                }
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
    });
    
    // start polling
    chrome.alarms.create("remoodle", {periodInMinutes: REFRESH_DELAY});

})();