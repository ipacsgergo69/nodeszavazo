const express = require('express');
const mongoose = require ('mongoose');
const config = require('./config.json');

mongoose.connect(config.databaseURL);



const app = express();

/*app.get('/', function(req,res){
    res.end('Hello World!');
});*/

app.use(express.static('public'));

const schema = new mongoose.Schema({
    nev: String,
    szavazatok: Number
});

const model = mongoose.model('Opciok' , schema, 'Opciok ');

app.use(express.urlencoded());

app.post('/szavazas', function(req,res){
    console.log(req.body);

    model.findOne({ nev: req.body.opció }, function(err, doc){
        if(doc) {
            console.log(req.body.opció + ' már létezik');

            doc.szavazatok++;
            doc.save();

        } else {
            console.log(req.body.opció + ' már létezik');
            new model({
                nev: req.body.opció,
                szavazatok: 1
            }).save();
        }    

        res.redirect('/');
    });
});
    


app.listen(11000);