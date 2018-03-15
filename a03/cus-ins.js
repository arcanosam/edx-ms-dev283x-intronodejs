module.export.insCustomers = (db, callback) => {

    const collection = db.collection('edxmsnodejs-a03')

    // Insert 3 documents
    collection.insert([
            {name : 'Bob'}, 
            {name : 'John'}, 
            {name : 'Peter'}
        ], 
        (error, result) => {

            if (error) 
                return process.exit(1)

            console.log(result.result.n)

            console.log(result.ops.length)

            console.log(`Inserted ${result.result.n} customers into the edxmsnodejs-a03 collection`)

            callback(result)
        }
    )
}
