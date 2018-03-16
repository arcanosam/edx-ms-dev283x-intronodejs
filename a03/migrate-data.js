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

let 
let migrationProcess = (nTasks)=>{


    async.parallel(
        ,
        (error, results) => {
            console.log(error)
            console.log(results)
        }
    )
    /*mongodb.MongoClient.connect(
        url, 
        (error, db) => {

            if (error) {
                console.log(error)
                return process.exit(1)
            }
            console.log('Connection is okay')

            let colc = db.db('edxmsnodejs-a03').collection('customersdata')

            console.log(nTasks)

            console.log(colc.s.namespace)

            db.close()

        }
    )*/
}

if(process.argv.length==3){

    nTasks = parseInt(process.argv[2])

    if(nTasks < 1 || nTasks > 100){

        usageHelp()
    }else{

        migrationProcess(
            nTasks
        )
    }
}else{

    usageHelp()
}
