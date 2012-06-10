/*
  sunkay
  test server to figure out node/express/mongodo interactions 
*/

var express = require('express'), 
	app = express.createServer(), 
	mongoose = require('mongoose');

// connect to the local database
mongoose.connect('mongodb://127.0.0.1/testdb1');

// create a simple schema
var Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectID;

// Define a simple person schema
var Person = new Schema({
   name : { type:String, required:true, trim:true },
   username : { type:String, required:true, trim:true },
});
var Person = mongoose.model('Person', Person);

// Create simple server paths with app.get

app.get('/', function(req, res){
  res.send('usage /list to list all records; /adduser/name/uname to add a user');
});

app.get('/list', function(req, res){
   Person.find({}, function(err, data){
       if(err){
           res.json(err);
       }
       else{
      	  var resmsg = "# of Records = "+data.length+"<br>";
      	  data.forEach(function(person){
      	      resmsg += "name: "+person.name+" username: "
      		          +person.username
                    +"<br>"; 
      	  });
      	  res.send(resmsg);
        }
   });
});


app.get('/adduser/:name/:username', function(req, res){
   console.log("enter Path = '/adduser'");
   var person_data = {
     name: req.params.name, 
     username: req.params.username,
   };

   console.log('person data' + JSON.stringify(person_data));

   var person = new Person(person_data);

   person.save(function(err,data){
       if(err){
           res.json(error);
       }
         res.json('saved: ' + data);
   });
});

app.listen(3001);
console.log("node mongoose app listening on port: "+app.address().port);
