module.exports.updCustomers =  = (db, callback) => {

    var collection = db.collection('edxmsnodejs-a03')

    collection.update(
        {
            name : name 
        },{
            $set: {
                grade : 'A' 
            }
        },
        (error, result) => {
            if (error)
                return process.exit(1)

            console.log(result.result.n) // will be 1

            console.log(`Updated address customer of name ${name}`)

            callback(result)
        }
    )
}
