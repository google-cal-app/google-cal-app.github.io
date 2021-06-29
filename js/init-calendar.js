// Client ID and API key from the Developer Console
var gapi = window.gapi
var CLIENT_ID = '1059668344187-aphtkmbe38ie64l3f9gobadm71oavo58.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAA3J1qo4xLTpLX_vJKQpDMMrZhUvBpudE';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.events";


const handleForm = () => {
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
    });
    console.log("Initialized client");
    loadCalendar();
}


function loadCalendar() {
    gapi.client.load("calendar", "v3", () => console.log("Loaded calendar"));
    startSignIn();
}

function startSignIn() {
    gapi.auth2.getAuthInstance().signIn()
        .then(()=>{
            var event = {
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                    'dateTime': '2021-06-29T09:11:55-07:00',
                    'timeZone': 'Europe/Belgrade'
                },
                'end': {
                    'dateTime': '2021-06-29T17:12:06-07:00',
                    'timeZone': 'Europe/Belgrade'
                },
                'recurrence': [
                    'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                    {'email': 'lpage@example.com'},
                    {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                    ]
                }
            };

            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
            });

            request.execute(function(event) {
                appendPre('Event created: ' + event.htmlLink);
                window.open(event.htmlLink);
            });
    });
}



// /**
//  *  Sign in the user upon button click.
//  */
// function handleAuthClick(event) {
//     gapi.auth2.getAuthInstance().signIn();
// }

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('success');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
