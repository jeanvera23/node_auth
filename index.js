const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.json({ 'message': 'Welcome Jean' })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        name: 'Jean'
    }
    jwt.sign({ user }, "secretKey", (err, token) => {
        res.json({
            user,
            token
        })
    })

});
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.status(403).json({ error: "Not Authorized" });
    }
}
app.listen(port, () => console.log(`Stated App on port ${port}`));