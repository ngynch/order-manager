const express = require("express");
 

const PORT = process.env.PORT || 3001;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');


db.serialize(function() {
  db.run("CREATE TABLE bestellungen (nummer INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT , status TEXT NOT NULL)");

  var stmt = db.prepare("INSERT INTO bestellungen (name,status) VALUES (?,?)");
  stmt.run("Huan","IN ARBEIT");
  stmt.run("Bach", "FERTIG");
  stmt.finalize();

  db.each("SELECT * FROM bestellungen", function(err, row) {
      console.log(row.nummer + ": " + row.name + ": " + row.status);
  });
});

app.route('/orders/:orderId?')
   .get(function (req, res) {
    const bestellungen = {allOrders:[]}
    new Promise((resolve, reject) => {
        db.each("SELECT * FROM bestellungen", function(err, row) {
            console.log("hi")
          bestellungen.allOrders.push({nummer: row.nummer, name: row.name, status: row.status});
        }, (err, rowCount) => {
            resolve();
        });
    })
    .then(() => {
        res.json(bestellungen);
    })
   })
    .post(function (req, res) {
        new Promise((resolve, reject) => {
            var stmt = db.prepare("INSERT INTO bestellungen (name,status) VALUES (?,?)");

        })
        console.log("______________")
        console.log(req.params);
        console.log(req.body);
        console.log("______________")
        res.json();
    })
    .put(function (req, res) {
        if(req.params.orderId == undefined){
            console.log("NO ID");
            res.json("NO ID");
        } else {
            console.log("change name");
            res.json();
        }
    });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
