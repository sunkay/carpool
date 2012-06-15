
module('List Events Tests')

$.mockjax({
	url:'list',
	responseText:{
		events:[{"name":"sun","location":"west","_id":"4fcd5903cb1729110b000001"},
			{"name":"tpo","location":"unknown"},
		]
	}
})  

asyncTest('test createEventsList and GetJSON Call', function(){

	$.getJSON(SVC_LIST_EVENTS, function(data){
		var output = createEventsList(data);
		equal(data.events.length, 2, "list events length");
		equal(output, "<li>sun</li><li>tpo</li>", "create events list output");

		start();
	})
})
