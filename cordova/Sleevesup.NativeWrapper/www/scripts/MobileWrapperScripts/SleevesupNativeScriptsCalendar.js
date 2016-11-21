var foundEvent = [];
var date = new Date(Date.now());
function onSuccess(msg) {
    alert('Calendar success: ' + JSON.stringify(msg));
}

function onError(msg) {
    alert('Calendar error: ' + JSON.stringify(msg));
}
//Create a event with recurrence 
function createCalendarEventWithOptions(eTitle, eLocation, eNotes, eStartDate, eEndDate, eRecurrance, eRepeat) {
    var title = eTitle;
    var loc = eLocation;
    var notes = eNotes;
    var startDate = new Date(eStartDate);
    var endDate = new Date(eEndDate);
    //var result = (new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59));
    //Calculate recurrance end date Week/Month/Year
    var recurEndDate = new Date();
    if (eRecurrance == 'weekly') {
        var totalWeek = 0;
        for (var i = 0; i < eRepeat; i++) {
            totalWeek += 7;
        }
        recurEndDate.setDate(startDate.getDate() + totalWeek);
    }
    if (eRecurrance == 'monthly') {
        recurEndDate.setDate(startDate.getDate());
        alert('The end date is' + recurEndDate);
        for (var i = 0; i < eRepeat; i++) {
            recurEndDate.nextMonth();
        }
    }
    if (eRecurrance == 'yearly') {
        recurEndDate.setDate(startDate.getDate());
        recurEndDate.setDate(recurEndDate.getFullYear * eRepeat);
    }
    var options = {
        url: 'https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin',
        calendarId: 1, // Android specific
        firstReminderMinutes: 1,
        recurrence: eRecurrance,
        recurrenceEndDate: new Date(recurEndDate),
        recurrenceInterval: 1,
    };
    window.plugins.calendar.createEventWithOptions(title, loc, notes, startDate, endDate, options, onSuccess, onError);
}
//Create normal calendar events with no option
function createCalendarEvent(eTitle, eLocation, eNotes, eStartDate, eEndDate) {
    var title = eTitle;
    var loc = eLocation;
    var notes = eNotes;
    var startDate = new Date(eStartDate);
    var endDate = new Date(eEndDate);
    window.plugins.calendar.createEvent(title, loc, notes, startDate, endDate, onSuccess, onError);
}
//Call this function to Delete a event
function deleteEvent(eTitle, eLocation, eNotes, eStartDate, eEndDate) {
    var title = eTitle;
    var loc = eLocation;
    var notes = eNotes;
    var startDate = new Date(eStartDate);
    var endDate = new Date(eEndDate);
    window.plugins.calendar.deleteEvent(title, loc, notes, startDate, endDate, onSuccess, onError);
}
//Open calendar app
function openCalendar() {
    // today + 3 days
    var d = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
    window.plugins.calendar.openCalendar(d);
}

//Find events within a certain time peroid
//Return a list of event upon a successful callback.
function GetAllEvents(eStartDate, eEndDate) {
    var startDate = new Date(eStartDate);
    var endDate = new Date(eEndDate);
    window.plugins.calendar.listEventsInRange(startDate, endDate, function (e) {
        var eventList = [];
        eventList = e;
        return eventList;
    }, onError);
}

//Find a specfic event
function FindEvent(eTitle, eLocation, eNotes, eStartDate, eEndDate, eStartTime, eEndTime) {
    var title = eTitle;
    var loc = eLocation;
    var notes = eNotes;
    var startDate = new Date(eStartDate);
    var endDate = new Date(eEndDate);
    var stime = eStartTime.split(':');
    var etime = eEndTime.split(':');
    startDate.setHours(stime[0], stime[1]);
    endDate.setHours(etime[0], etime[1]);
    window.plugins.calendar.findEvent(title, loc, null, startDate, endDate, function (e) {
        return e
    });
}

//Modify event on android device
function ModifyEventAndroid(eTitle, eLocation, eNotes, eStartDate, eEndDate, eStartTime, eEndTime) {
    var title = eTitle;
    var loc = eLocation;
    var notes = eNotes;
    var startDate = eStartDate;
    var endDate = eEndDate;
    var startTime = eStartTime;
    var endTime = eEndTime
    var result = FindEvent(title, loc, notes, startDate, endDate, startTime, endTime);
    if (foundEvent != null) {
        var newTitle;
        var newLocation
        var newNotes
        var newStartDate
        var newEndDate
        createCalendarEvent(eTitle, eLocation, eNotes, eStartDate, eEndDate);
        //TODO delete event
    }
 }

//This function will clean up start date and end date time
function CleanTime(eStartDate, eEndDate) {
    var startDate = eStartDate;
    var eEndDate = eEndDate;
    startDate.setMinutes(0);
    endDate.setMinutes(0);
    startDate.setSeconds(0);
    endDate.setSeconds(0);
    //splits time based on : delimiter 
    var stime = document.getElementById('StartTime').value.split(':');
    var etime = document.getElementById('EndTime').value.split(':');
    startDate.setHours(stime[0], stime[1]);
    endDate.setHours(etime[0],etime[1]);
}
//Upload a event to the server 
function UploadEvents(JsonObject) {
    var oXHR = new XMLHttpRequest();
    oXHR.open('POST', Calendar.addEvent);
    oXHR.setRequestHeader("Content-Type", "application/json");
    oXHR.send(JSON.stringify(JsonObject));
}
//Display the events 
function DisplayEvents(events) {
    EventObj = events;
    var eventList = document.getElementById('eventList');
    var len = c.length;
    for (var i = 0; i < len; i++) {
        eventList.innerHTML += "<div id='" + i + "'>" + "Update :" + "<input type = 'radio' value ='" + i + "'>" + "<br/>"
                            + "Event ID :" + events[i].event_id + "<br/>"
                            + "Title :" + events[i].title + "<br/>"
                            + "Location :" + events[i].eventLocation + "<br/>"
                            + "Start Date :" + events[i].dtstart + "<br/>"
                            + "End Date :" + events[i].dtend + "<br/>"
                            + "Description :" + events[i].notes + "<br/>" + "</div>"
                            + "<hr>";
        window.plugins.calendar.findEvent(null, null, null, new Date(c[i].dtstart), new Date(c[i].dtend), onSuccess, onError);
    }
}

//Delete & Update selected events, Note: this function is for android only
//Two operation in one function it will insert the new event and delete 
//the previous event.
function deleteEventAndroid() {
    var elLength = document.MyEvents.elements.length;
    for (var i = 0; i < elLength; i++) {
        var type = MyEvents.elements[i].type;
        if (type == "radio" && MyEvents.elements[i].checked) {
            var div = document.getElementById(i);
            div.innerHTML += "<input type = 'textbox' value ='" + EventObj[i].title + "'" + "id='" + "titleTextBox" + i + "'>" + "<br/>"
            + "<input type = 'textbox' value ='" + EventObj[i].eventLocation + "'" + "id='" + "locationTextBox" + i + "'>" + "<br/>"
            + "<input type = 'textbox' value ='" + new Date(EventObj[i].dtstart) + "'" + "id='" + "StartDateTextBox" + i + "'>" + "<br/>"
            + "<input type = 'textbox' value ='" + new Date(EventObj[i].dtend) + "'" + "id='" + "endDateTextBox" + i + "'>" + "<br/>"
            + "<input type = 'button' value ='Save Change' id='Update'>";
            var flag = false;
            var UpdateButton = document.getElementById("Save Change");
            UpdateButton.addEventListener("click", function () {
                flag = true;
                title = document.getElementById('titleTextBox' + i).value;
                loc = document.getElementById('locationTextBox' + i).value;
                startDate = new Date(document.getElementById('StartDateTextBox' + i).value);
                endDate = new Date(document.getElementById('endDateTextBox' + i).value);
                var calOptions = window.plugins.calendar.getCalendarOptions();
                //create event
                window.plugins.calendar.createEvent(title, loc, notes, startDate, endDate, onSuccess, onError);
                //delete event
            })
        }
        else if (type == "radio") {
            alert("Form element in position " + i + " is of type checkbox and is not checked.");
        }
    }
}
//////////////Date Utility for calculating recurring events//////////
//get next month
function nextMonth() {
    var thisMonth = this.getMonth();
    this.setMonth(thisMonth + 1);
    if (this.getMonth() != thisMonth + 1 && this.getMonth() != 0)
        this.setDate(0);
}
Date.prototype.nextMonth = nextMonth;
function GetDayInMonth(cDate) {
    var cDate = new Date();
    var n = cDate.toString("MM/dd/yyyy");
    var year = n.split();
    var getDays = new Date(year, month, 0).getDate();
    return n;
}
//Convert month to number
function convertMonthNameToNumber(monthName) {
    var myDate = new Date(monthName + " 1, 2000");
    var monthDigit = myDate.getMonth();
    return isNaN(monthDigit) ? 0 : (monthDigit + 1);
}