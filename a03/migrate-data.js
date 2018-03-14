// Assignment 03
// Data migration tool with MongoDB

const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')

const url = 'mongodb://localhost:27017/edx-course-db'

app.use(logger('dev'))

mongodb.MongoClient.connect(
    url, 
    (error, db) => {

        if (error) 
            return process.exit(1)

        db.collection('accounts').insert(
            newAccount, 
            (error, results) => {

                if (error) 
                    return next(error)

                res.send(results)
            }
        )

        db.collection('accounts').update(
            {_id: mongodb.ObjectID( req.params.id)},
            {$set: req.body},
            (error, results) => {
                if (error)
                    return next(error)
            }
        )

        app.use(errorhandler())
        app.listen(3000)
    }
)
