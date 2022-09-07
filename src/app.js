const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// point express to use public directory
app.use(express.static(path.join(__dirname, '/public/')));

// express middleware to handle POST data
app.use(express.urlencoded({extended: true}));

// read data synchronously from json file
const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData);


// handles get requests to /
app.get('/', (req,res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    });
});

app.get('/savings', (req,res) => {
    res.render('account', {account: accounts.savings});
});

app.get('/checking', (req,res) => {
    res.render('account', {account: accounts.checking});
});

app.get('/credit', (req,res) => {
    res.render('account', {account: accounts.credit});
});

app.get('/profile', (req,res) => {
    res.render('profile', {user: users[0]});
});

app.get('/transfer', (req,res) => {
    res.render('transfer');
});

app.post('/transfer', (req,res) => {
    // calculate and set balances
    const amount = parseInt(req.body.amount);
    if (req.body.from === 'savings'){
        let balance = parseInt(accounts['savings'].balance);
        balance -= amount 
        accounts['savings'].balance = balance;
    }
    else {
        let balance = parseInt(accounts['checking'].balance);
        balance -= amount 
        accounts['checking'].balance = balance;
    }
    if (req.body.to === 'savings'){
        let balance = parseInt(accounts['savings'].balance);
        balance += amount 
        accounts['savings'].balance = balance;
    }
    else {
        let balance = parseInt(accounts['checking'].balance);
        balance += amount 
        accounts['checking'].balance = balance;
    }
    
    // convert account data to JSON
    const accountsJSON = JSON.stringify(accounts);
    
    // write account data to JSON file
    fs.writeFileSync(path.join(__dirname,'json/accounts.json'), accountsJSON, 'utf8');

    res.render('transfer', {message: 'Transfer Completed'});
});

app.get('/payment', (req,res) => {
    res.render('payment', {account: accounts.credit});
});

app.post('/payment', (req,res) => {
    const amount = parseInt(req.body.amount);

    let balance = parseInt(accounts.credit.balance);
    balance -= amount;
    accounts.credit.balance = balance;

    let available = parseInt(accounts.credit.available);
    available += amount;
    accounts.credit.available = available;
    
    // convert account data to JSON
    const accountsJSON = JSON.stringify(accounts);
    
    // write account data to JSON file
    fs.writeFileSync(path.join(__dirname,'json/accounts.json'), accountsJSON, 'utf8');

    res.render('payment', {
        message: 'Payment Successful',
        account: accounts.credit
    });
});

// create a server listening on port 3000 that prints message
app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
})