const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// point express to use public directory
app.use(express.static(path.join(__dirname, '/public/')));

// handles get requests to /
app.get('/', (req,res) => {
    res.render('index', {title: 'Index'});
});

// create a server listening on port 3000 that prints message
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
})