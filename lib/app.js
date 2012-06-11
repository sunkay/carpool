document.ontouchmove = function(e){ e.preventDefault(); }

// Initializations - need to find a better place for these
var SVC_URL = "http://localhost/carpool/";
var SVC_LIST_EVENTS = SVC_URL+"list";
var SVC_ADD_EVENT = SVC_URL+"addEvent";

$(document).ready(function(){

	// list events during page load, do it only once, from then on use the refresh button 
	// live vs. bind http://jquerymobile.com/demos/1.0a2/experiments/api-viewer/docs/live/index.html
	$('#listEventsPage').live('pagecreate', function(){
		// get the event data from server as JSON
		$.getJSON(SVC_LIST_EVENTS, function(data){
			console.log("# of events = " + data.events.length);

			var output = createEventsList(data);

			// append and refresh the list otherwise nothing will be seen
			$('#eventsListView').append(output).listview('refresh');
		});
	});

	// list events when refresh button is pressed 
	$('#refreshEventsBtn').live('click', function(){
		// get the event data from server as JSON
		$.getJSON(SVC_LIST_EVENTS, function(data){

			// create list elements
			var output = createEventsList(data);

			console.log("Replacing with events = " + output);

			// append and refresh the list otherwise nothing will be seen
			$('#eventsListView').html(output).listview('refresh');
		});
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

