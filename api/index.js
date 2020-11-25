const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/jean', (req, res) => {
    res.json({ 'message': 'Welcome Jean' })
});

app.get('/api/test', (req, res) => {
    res.json({ 'message': 'Welcome test' })
});

const port = process.env.PORT || 3000
app.listen(port, (e) => {
    console.log("Listening on port " + port);
})
module.exports = {
    app
};