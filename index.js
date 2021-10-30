const { MongoClient } = require('mongodb');
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e3dsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)
async function run() {
    try{
        await client.connect()
        // console.log("batabase connection done")
        const database = client.db("tourismweb")
        const servicesCollection = database.collection("services")
        const usersorderCollection = database.collection("usersOrder")

        // GET method to collect service data from database 
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({})
            const services = await cursor.toArray()
            // console.log("services collect successful")
            res.send(services)
        })

        // GET method to collect data using _id from database
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            // console.log("service id", id)
            const query = {_id: ObjectId(id)}
            const result = await servicesCollection.findOne(query) 
            // console.log("service result", result)
            res.send(result)

        })

        // POST method insert user data to database
        app.post('/usersorder', async (req, res) => {
            const userData = req.body
            // console.log("user order data", userData)
            const result = await usersorderCollection.insertOne(userData)
            console.log("user data insert result", result)
            res.json(result)
        }) 

        // GET method find user data from database 
        app.get('/usersorder', async (req, res) => {
            const cursor = usersorderCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        // GET method to delete user from database
        app.delete('/usersorder/:id', async (req, res) => {
            const id = req.params.id
            // console.log("collect user id", id)
            const qurey = {_id: ObjectId(id)}
            const result = await usersorderCollection.deleteOne(qurey)
            console.log("deleted id result", result)
            res.json(result)
        })

    }finally{
        // await client.close()
    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("tourism web server on")
});

app.listen(port, () => {
    console.log("tourism server running port", port)
});


// heroku hosting link = https://gentle-river-15524.herokuapp.com/