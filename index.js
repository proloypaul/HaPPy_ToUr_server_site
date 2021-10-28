const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("tourism web server on")
});

app.listen(port, () => {
    console.log("tourism server running port", port)
});