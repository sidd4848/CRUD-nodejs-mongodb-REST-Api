const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app = express();
const port = 8000;
var db;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017/crud101', (err, database) => {
  if (err) return console.log(err)
	  db = database;
});


app.listen(port, ()=>{
	console.log('We are live on' + port);
});

app.get('/new', (req, res) => {
	db.collection('demotables').find().toArray((err, result) => {
    if (err) return console.log(err);
	res.json(result);
  });
});
app.get('/new', (req, res) => {
    
	console.log(req.body.name);
    db.collection('demotables').findOne({name : name}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
		console.log(item);
        res.send(item);
      }
    });
  });

app.post('/new', (req,res) =>{
	 console.log(req.body);
	 const note = { name: req.body.name, age: req.body.age}
  db.collection('demotables').insert(note, (err, results) => {
});

	res.send('inserted');
});
app.put('/new', (req, res) => {
	
	var updateid = req.body.upd;
  db.collection('demotables').findOneAndUpdate({name: req.body.upd}, {
    $set: {
      name: req.body.name
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
		console.log(result);
    res.send("Value updated");
  })
})

 app.delete('/new', (req, res) => {
	var nameid = req.body.name;
    db.collection('demotables').remove({name : nameid}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + nameid + ' deleted!');
      } 
    });
  });
