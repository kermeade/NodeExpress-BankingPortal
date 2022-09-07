const fs = require('fs');
const path = require('path');

// read data synchronously from json file
const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData);

const writeJSON = () => {
    // convert account data to JSON
    const accountsJSON = JSON.stringify(accounts);
    
    // write account data to JSON file
    fs.writeFileSync(path.join(__dirname,'json/accounts.json'), accountsJSON, 'utf8');
};

module.exports = { accounts, users, writeJSON };