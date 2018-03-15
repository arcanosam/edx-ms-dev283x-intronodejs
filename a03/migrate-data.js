// Assignment 03
// Data migration tool with MongoDB

const fs = require('fs')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')

let {insCustomers} = require('./cus-ins.js')
let {updCustomers} = require('./cus-upd.js')

const url = 'mongodb://localhost:27017/edxmsnodejs-a03'

app.use(logger('dev'))

async function migraCustomers(db) {

    const json_data = {
        cust: fs.readFileSync('./m3-customer-data.json', 'utf-8'),
        addr: fs.readFileSync('./m3-customer-data.json', 'utf-8')
    }

    try {
        await insCustomers(
            db, 
            () => {
                updCustomers(
                    db, 
                    () =>  {
                        db.close()
                    }
                )
            },
            json_data
        )

        console.log('Done!')
        process.exit()

    } catch(e) {
        console.log(e);
        process.exit();
    }
};

mongodb.MongoClient.connect(
    url, 
    (error, db) => {

        if (error) 
            return process.exit(1)

        console.log('Connection is okay')

        migraCustomers(db)
    }
)

app.use(errorhandler())

app.listen(3000)
