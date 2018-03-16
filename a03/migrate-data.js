// Assignment 03
// MongoDB Migration Node Script

const fs = require('fs')
const process = require('process')

const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const async = require('async')

const url = 'mongodb://127.0.0.1:27017/edxmsnodejs-a03'

let nTasks=0
let RECORDS=1000

let usageHelp = ()=>{
    console.log('Assignment 03 - MongoDB Migration Node Script')
    console.log('Usage:')
    console.log('   node migrate-data.js [ntasks]')
    console.log('   ntasks - number of parallel tasks used to migrate')
    console.log('          - maximum tasks: 100')
    console.log('          - minimum task:    1')
}

if(process.argv.length==3){

    nTasks = process.argv[2]

    if(nTasks < 1 || nTasks > 100){

        usageHelp()
    }    
}else{

    usageHelp()
}

const json_data = {
    cust: JSON.parse(fs.readFileSync('./m3-customer-data.json', 'utf-8')),
    addr: JSON.parse(fs.readFileSync('./m3-customer-data.json', 'utf-8'))
}

mongodb.MongoClient.connect(
    url, 
    (error, db) => {

        if (error) {
            console.log(error)
            return process.exit(1)
        }

        console.log('Connection is okay')

        console.log(db.db('edxmsnodejs-a03').collection('customersdata'))

        db.close()

        /*async.parallel(
            migrationProcess(nTasks,collection),
            (error, results) => {
                console.log(error)
                console.log(results)
            }
        )*/
    }
)
