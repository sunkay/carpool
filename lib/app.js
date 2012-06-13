document.ontouchmove = function(e){ e.preventDefault(); }

// Initializations - need to find a better place for these
//var SVC_URL = "http://localhost/carpool/";
var SVC_LIST_EVENTS = "list";
var SVC_ADD_EVENT = "addEvent";

// initialize logging
var log = log4javascript.getLogger("app.js");

$(document).ready(function(){

	// list events during page load, do it only once, from then on use the refresh button 
	// live vs. bind http://jquerymobile.com/demos/1.0a2/experiments/api-viewer/docs/live/index.html
	$('#listEventsPage').live('pagecreate', function(){
		// get the event data from server as JSON
		$.getJSON(SVC_LIST_EVENTS, function(data){
			log.info("# of events = " + data.events.length);

			var output = createEventsList(data);
			log.debug(output);

			// append and refresh the list otherwise nothing will be seen
			$('#eventsListView').append(output).listview('refresh');
		})
		.error(function(jqXHR, textStatus, errorThrown){
			log.error(textStatus);
		})
	});

	// list events when refresh button is pressed 
	$('#refreshEventsBtn').live('click', function(){
		// get the event data from server as JSON
		$.getJSON(SVC_LIST_EVENTS, function(data){

			// create list elements
			var output = createEventsList(data);
			log.debug("Replacing with events = " + output);

			// append and refresh the list otherwise nothing will be seen
			$('#eventsListView').html(output).listview('refresh');
		})
		.error(function(jqXHR, textStatus, errorThrown){
			log.error(textStatus);
		})
	});

});

function createEventsList(data)
{
	var output = "";
	// loop through the events
	$.each(data.events, function(arrId, event){
		output += "<li>"+event.name+"</li>";
	});
	return output;
}

// logging initialization code
function loggingInitialize()
{
	// Create a console appender that is inherited by all loggers
	var appender = new log4javascript.PopUpAppender();
	appender.setThreshold(log4javascript.Level.DEBUG);

	// Limit the number of messages displayed in the console at any one time
	appender.setMaxMessages(2000);

	log4javascript.getRootLogger().addAppender(appender);

	// Disable all logging except ERROR and FATAL for the "MyApp.Components"
	// logger and all its descendants (including "MyApp.Components.Component1" and
	// "MyApp.Components.Component2")
	//log4javascript.getLogger("MyApp.Components").setLevel(log4javascript.Level.ERROR);
}

