const express = require('express');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const app = express();

app.get('/jean', (req, res) => {
    res.json({ 'message': 'Welcome Jean' })
});

app.get('/api/test', (req, res) => {
    res.json({ 'message': 'Welcome test' })
});
app.get('/mongodb', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydbtest");
        dbo.collection("users").find({}, function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});
const port = process.env.PORT || 3000
app.listen(port, (e) => {
    console.log("Listening on port " + port);
})

module.exports = {
    app
};