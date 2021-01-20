
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(cors());

// app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/dist/Talabat'));

app.all('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/Talabat/index.html'));
    // res.sendFile('/dist/index.html', { root: __dirname });
});

const port = process.env.PORT
app.listen(port || 8080);