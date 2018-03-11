const fs = require('fs')

const csv=require('csvtojson')

const csvFilePath='customer-data.csv'

csv({

    trim:true

}).fromFile(csvFilePath).on(
    'end_parsed',
    (jsonArray)=>{
        fs.writeFileSync(
            'customer-data.json',
            JSON.stringify(jsonArray,null,2)
        )
    }
).on(
    'done',
    (error)=>{
        console.log('end')
    }
)
