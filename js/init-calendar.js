// Client ID and API key from the Developer Console
var gapi = window.gapi
var CLIENT_ID = '1059668344187-aphtkmbe38ie64l3f9gobadm71oavo58.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAA3J1qo4xLTpLX_vJKQpDMMrZhUvBpudE';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.events";


function handleGoogleAuth() {
    handleClientLoad();
}
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', () => {
        console.log("Loaded client");
        initClient();
    });
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        console.log("Initialized client");
        loadCalendar();
    });
}


function loadCalendar() {
    gapi.client.load("calendar", "v3", () => console.log("Loaded calendar"));
    startSignIn();
}

function startSignIn() {
    gapi.auth2.getAuthInstance().signIn()
        .then(()=>{
            var event = {
                'summary': 'Google-cal-app',
                // 'location': '800 Howard St., San Francisco, CA 94103',
                'description': note.value,
                'params': {
                    'sendNotifications': true
                },
                'start': {
                    'dateTime': startMeeting.toISOString(),
                    'timeZone': 'Europe/Belgrade'
                },
                'end': {
                    'dateTime': endMeeting.toISOString(),
                    'timeZone': 'Europe/Belgrade'
                },
                'recurrence': [
                    // 'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                    {'email': email.value},
                    // {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {'method': 'email', 'minutes': 10},
                        {'method': 'email', 'minutes': 30},
                        {'method': 'popup', 'minutes': 10},
                        {'method': 'popup', 'minutes': 30}
                    ]
                }
            };

            var request = gapi.client.calendar.events.insert({
                'calendarId': 'obspos8105m8t7m28lu2465no4@group.calendar.google.com',
                'resource': event,
                'sendUpdates': 'all'
            });

            request.execute(function(event) {
                if (event.error) {
                    console.log('Event failed with code: ' + event.code + ' ' + event.error.message);
                    appendPre('Event failed, something went wrong.');
                } else {
                    appendPre('Event created: ' + event.htmlLink);
                }
            });
    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    if (pre.childNodes.length > 1) {
        pre.replaceChild(textContent, pre.childNodes[0]);
    } else {
        pre.appendChild(textContent);
    }
}
