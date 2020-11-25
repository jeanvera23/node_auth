const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();

app.get('/jean', (req, res) => {
    res.json({ 'message': 'Welcome Jean' })
});

app.get('/api/test', (req, res) => {
    res.json({ 'message': 'Welcome test' })
});
app.get('/mongodb', async (req, res) => {

    var url = "mongodb://localhost:27017/";
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const db = client.db('dbtest');
        const collection = db.collection('users');
        const items = await collection.find().toArray();
        res.json(items);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
});
const port = process.env.PORT || 3000
app.listen(port, (e) => {
    console.log("Listening on port " + port);
})

module.exports = {
    app
};