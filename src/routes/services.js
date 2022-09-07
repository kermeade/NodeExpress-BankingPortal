const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req,res) => {
    res.render('transfer');
});

router.post('/transfer', (req,res) => {
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
    
    // convert account data to JSON and write to JSON file
    writeJSON();

    res.render('transfer', {message: 'Transfer Completed'});
});

router.get('/payment', (req,res) => {
    res.render('payment', {account: accounts.credit});
});

router.post('/payment', (req,res) => {
    const amount = parseInt(req.body.amount);

    let balance = parseInt(accounts.credit.balance);
    balance -= amount;
    accounts.credit.balance = balance;

    let available = parseInt(accounts.credit.available);
    available += amount;
    accounts.credit.available = available;
    
    // convert account data to JSON and write to JSON file
    writeJSON();

    res.render('payment', {
        message: 'Payment Successful',
        account: accounts.credit
    });
});

module.exports = router;