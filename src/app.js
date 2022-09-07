const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// point express to use public directory
app.use(express.static(path.join(__dirname, '/public/')));

// express middleware to handle POST data
app.use(express.urlencoded({extended: true}));

// connects app to routes
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

// handles get requests to /
app.get('/', (req,res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    });
});

app.get('/profile', (req,res) => {
    res.render('profile', {user: users[0]});
});

// creates a server listening on port 3000 that prints message
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
})