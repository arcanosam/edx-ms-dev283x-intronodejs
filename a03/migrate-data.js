// Assignment 03
// MongoDB Migration Node Script

const assert = require('assert');

const logger = require('morgan')
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

let migrationProcess = (nTasks) =>{

    mongodb.MongoClient.connect(
        url,
        (error, client) => {

            if (error) {
                console.log(error)
                return process.exit(1)
            }

            console.log('Connection is okay')

            let colcCD = client.db('edxmsnodejs-a03').collection('customersdata')

            colcCD.find({}).toArray(

                (error,customerData)=>{

                    let collCM = client.db('edxmsnodejs-a03').collection('customers')

                    customerData.forEach(
                        (cusRec,idx)=>{

                            collCM.insertOne(
                                cusRec,
                                function(err, r) {
                                    assert.equal(null, err);
                                    assert.equal(1, r.insertedCount);
                                    console.log(r)
                                    client.close()
                                }
                            )

                        }
                    )
                }
            )
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
