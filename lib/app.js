document.ontouchmove = function(e){ e.preventDefault(); }

// Initializations - need to find a better place for these
var SVC_URL = "http://localhost/carpool/";
var SVC_LIST_EVENTS = SVC_URL+"list";

$(document).ready(function(){

	// list events during page load, do it only once, from then on use the refresh button 
	$('#listEventsPage').live('pagecreate', function(){
		// get the event data from server as JSON
		$.getJSON(SVC_LIST_EVENTS, function(data){
			console.log("# of events = " + data.events.length);
			var output = "";

			// loop through the events
			$.each(data.events, function(arrId, event){
				output += "<li>"+event.name+"</li>";
			});

			// append and refresh the list otherwise nothing will be seen
			$('#eventsListView').append(output).listview('refresh');
		});
	});


function refreshEventList()
{
	
}


});

