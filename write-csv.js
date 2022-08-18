const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const csvWriter = createCsvWriter({
    path: 'users.csv',
    header: [
        {id: 'id', title: 'ID'},
        {id: 'email', title: 'Email'},
        {id: 'first_name', title: 'FirstName'},
        {id: 'last_name', title: 'LastName'}
    ]
});

module.exports = csvWriter
