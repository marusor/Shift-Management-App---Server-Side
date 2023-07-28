const {MongoClient,ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://bamarincean:tastatura1@bogdan.lqpeeyn.mongodb.net/"

const client = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
module.exports = client