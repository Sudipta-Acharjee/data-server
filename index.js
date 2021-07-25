const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());
const port = 5000;

const uri = "mongodb+srv://internDataUser:internDataUser321@cluster0.f3vnz.mongodb.net/internDataInfo?retryWrites=true&w=majority";

const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("internDataInfo").collection("internDataInfo322");

    app.post('/addData', (req, res) => {
        const datas = req.body;
        console.log(datas)
        collection.insertMany(datas)
            .then(result => {
                console.log(result.insertedCount)
                  res.send(result.insertedCount)
            })
    })
    app.get('/',(req,res)=>{
        res.send('hello ema watson')
    })
    
    app.get('/data',(req,res) => {
        collection.find({})
        .toArray((err,documents) => {
            res.send(documents)
        })
    })
});


app.listen(process.env.PORT || port);