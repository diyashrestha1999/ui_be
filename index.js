const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/listItems', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
   });
})

app.post('/addItem', function(req, res){
	const body = {
	    name: req.body.name,
	    description: req.body.description,
      changedFrom: req.body.changedFrom,
      changedTo: req.body.changedTo
	}
	filePath = __dirname + '/data.json'
  const user_json = fs.readFileSync(filePath).toString();
  data = JSON.parse(user_json)
  data.push(body)
  
	fs.writeFile(filePath, JSON.stringify(data), function(err) {
		if (err) { throw err }
		res.status(200).json({
			message: "File successfully written"
		})
  })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("listening at http://%s:%s", host, port)
})
