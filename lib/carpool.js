/*
  sunkay
  carpool server  using node/express/mongodo interactions 
*/

var express = require('express'), 
	app = express.createServer(), 
	mongoose = require('mongoose');

  app.use(express.bodyParser());

// connect to the local database
mongoose.connect('mongodb://127.0.0.1/carpool');

// create a simple schema
var Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectID;

// Define a Event schema
var Event = new Schema({
   name : { type:String, required:true, trim:true },
   location : { type:String, required:true, trim:true },
   start_date: { type:Date, required:true},
});
var Event = mongoose.model('Event', Event);

function res(win){
  return function(err, result){
    if(err){
      util.debug("mongo:err = " +err);
      db.close();
    }
    else{
      win(result);
    }
  }
}

// Create simple server paths with app.get

app.get('/', function(req, res){
  res.send('usage /list to list all records; /addevent/name/location to add an event');
});

app.get('/list', function(req, res){
   Event.find({}, function(err, data){
       if(err){
           res.json(err);
       }
       else{
          
      	  var resmsg = "# of Records = "+data.length+"<br>";
      	  data.forEach(function(event){
      	      resmsg += "name: "+event.name + "<br>"
                    + "location: " + event.location + "<br>"
                    + "Start Date: " + event.start_date + "<br>"
                    +"<br>"; 
      	  });
          console.log(resmsg);
          var jsondata = {'events': data};
      	  res.send(jsondata);
        }
   });
});

app.get('/addevent/:name/:location/:start', function(req, res){
   console.log("enter GET = '/addevent'");
   var event_data = {
     name: req.params.name, 
     location: req.params.location,
     start_date: req.params.start,
   };

   console.log('event data' + JSON.stringify(event_data));

   var event = new Event(event_data);

   event.save(function(err,data){
       if(err){
           res.json(err);
       }
         res.json('saved event: ' + data);
   });
});

app.post('/addevent', function(req,res){
   console.log("enter POST = '/addevent'");
   var event_data = {
     name: req.body.name, 
     location: req.body.location,
     start_date: req.body.start,
   };

   console.log('event data' + JSON.stringify(event_data));

   var event = new Event(event_data);

   event.save(function(err,data){
       if(err){
           res.json(err);
       }
       res.json('saved event: ' + data);
   });
});


app.listen(3001);
console.log("node mongoose carpool app listening on port: "+app.address().port);
