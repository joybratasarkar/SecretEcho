const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('It works!'));
console.log('test');

app.listen(5000, () => console.log('Ping server up on port 5000'));
