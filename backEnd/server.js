'use strict';
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan'); //used for logging request details
var bodyParser = require('body-parser'); 
var cors = require('cors'); // cross origin resource sharing
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId; //Adds an auto-generated ObjectId 

var app = express();

/*
Express has a Middleware which is used by routes. lets take, app.use(express.bodyParser()) which added this layer to my Middleware stack. 
This ensures that for all incoming requests the server parses the body which Middleware takes cares of. 
This happens because we added the layer to our Middleware. 
*/

app.use(express.static(__dirname)); //adds the static Middleware to the express server & starts listening on provided port
app.use(morgan('dev')); // tells express to log using morgan in the pre-defined format; combined, common, dev, tiny, short etc
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Hawan')

mongoose.Promise = global.Promise;

var infoSchema = new Schema({
	userId: String,
	password: String,
	name: String,
	phone: Number,
	email: String,
	country: String
})

//compiling the schema into a model, Models are constructors compiled from our Schema definitions. Instances of these models
//represent documents which can be saved and retrieved from our database
var info = mongoose.model('info', infoSchema);

app.post('/postInfo', function (req, res) {
	//A model is a class with which we construct documents. In this case, each document will be a 
	//info with properties and behaviors as declared in our schema
	var newInfo = info();   
	newInfo.userId = req.body.userId;
	newInfo.password = req.body.password;
	newInfo.name = req.body.name;
	newInfo.phone = req.body.phone;
	newInfo.email = req.body.email;
	newInfo.country = req.body.country;
	//each document can be saved using the save method, the first callback function is an error
	newInfo.save(function (err, docs) {
		if (err) {
			return res.send("Err")
		}
		return res.json(docs)
	})
})
app.get('/getInfo', function(req, res){
	//using the find method to display all the documents
	info.find(function(err, docs){
		if (err) {
			return res.status(500).send({error:err}); 
		} else{
			return res.status(200).send({data:docs});
		}
		
	})
})
app.delete('/deleteInfo', function(req,res){
	 info.remove({ "_id" : req.query.id},function(err,docs){
		if (err) {
			return res.status(500).send({error:err}); 
		} else{
			return res.status(200).send({data:docs});
		}
	})
})

/*
app.put('/editInfo', function(req,res){
	 info.remove({ "_id" : req.query.id},function(err,docs){
		if (err) {
			return res.status(500).send({error:err}); 
		} else{
			return res.status(200).send({data:docs});
		}
	})
})
*/
app.listen(8000, function(){
	console.log("App listening on port 8000");
});
