// Assignment 03
// MongoDB Migration Node Script

const fs = require('fs')
const process = require('process')

const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const async = require('async')

const url = 'mongodb://127.0.0.1:27017/edxmsnodejs-a03'

const RECORDS=1000

let nTasks=0

let usageHelp = ()=>{
    console.log('')
    console.log('Assignment 03 - MongoDB Migration Node Script failed!')
    console.log('Usage:')
    console.log('   ./runA a03 [ntasks]')
    console.log('   ntasks - number of parallel tasks used to migrate')
    console.log('          - maximum tasks: 100')
    console.log('          - minimum task:    1')
}

let insCustomersData = (db, recs)=>{


    const collection = db.db('customers')

    collection.insert(
        [],
        (error, result) => {
            if (error) 
                return process.exit(1)

            console.log(result.result.n)
            console.log(result.ops.length)
            console.log('Inserted 3 documents into the edx-course-students collection')

        }
    )


}

let migrationProcess = (nTasks) =>{


    mongodb.MongoClient.connect(
        url,
        (error, db) => {

            if (error) {
                console.log(error)
                return process.exit(1)
            }

            console.log('Connection is okay')

            let colc = db.db('edxmsnodejs-a03').collection('customersdata')

            let startR = 0

            let loopNum = RECORDS/nTasks

            let jsonSlots = []

            for(var i=0; i < loopNum;i++){

                colc.find(
                    {},
                    {
                        skip: startR,
                        limit: nTasks
                    }

                ).toArray(

                    (error, docs) => {
                        if (error)
                            return process.exit(1)

                        let jsonTasks = {}


                        for(let eachDoc of docs){

                            jsonTasks[eachDoc.id] = ()=>{ insCustomersData(db,eachDoc) }
                        }


                        async.parallel(
                            jsonTasks,
                            (error, results) => {
                                if(error)
                                    console.log(`Error message: ${error}`)

                                if(Object.keys(results).length)
                                    console.log(`Result object: ${results}`)
                            }
                        )
                    }
                )

                startR += nTasks

            }

            db.close()

        }
    )
}

if(process.argv.length==3){

    nTasks = parseInt(process.argv[2])

    if(nTasks < 1 || nTasks > 100){

        usageHelp()
    }else{

        migrationProcess(nTasks)

    }
}else{

    usageHelp()
}
