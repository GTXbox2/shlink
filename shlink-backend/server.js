const express = require('express')
const mongoClient = require('mongodb').MongoClient

const app = express()
var database

app.use('/', express.static(__dirname + '/'));

mongoClient.connect('mongodb://localhost:27017/', {useUnifiedTopology: true}, function(err, client){
    if(err) {
        throw err;
    }
    console.log('database connected');
    database = client.db("shlink");
    app.listen(3000, () => {
      console.log('server started');
    })
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/generate', async (req, res) => {
  try {
    if(req.query.link.trim()) {
      let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      let minRange = 4;
      let maxRange = 8;
      let choosenRange = Math.floor(Math.random() * (maxRange - minRange) + minRange);
      let shortLink = '';
      let readyToGo = false;
      while(!readyToGo) {
        for(let i=0; i<choosenRange; i++) {
          shortLink += chars[Math.floor(Math.random() * chars.length)];
        }
        let exists = await database.collection('links').findOne({ 'short_link': shortLink });
        if(!exists) {
          readyToGo = true;
          database.collection('links').insertOne({ 'original_link': req.query.link, 'short_link': shortLink }, (err, data) => {
            if(err) {
              throw err;
            }
            res.send(shortLink);
          });
        }
      }
    }
  }
  catch(e) {
    console.log(e);
  }
})

app.post('/check', (req, res) => {
  try {
    let linkSplit = req.query.link.split('/');
    let link = linkSplit[linkSplit.length-1];
    database.collection('links').findOne({ 'short_link': link }, (err, data) => {
      if(err) {
        throw err;
      }
      if(data) {
        res.send(data['original_link']);
      }
      else {
        res.send('');
      }
    });
  }
  catch(e) {
    console.log(e);
  }
})

app.get('/:link', (req, res) => {
  database.collection('links').findOne({ 'short_link': req.params.link }, (err, data) => {
    if(err) {
      throw err;
    }
    res.redirect(data['original_link']);
  });
})
