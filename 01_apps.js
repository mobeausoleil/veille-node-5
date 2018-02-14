const express = require('express');
const app = express();
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template

app.use(express.static('public'));

//Connexion à mongoDB et au serveur Node.Js
let db // variable qui contiendra le lien sur la BD
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})

//Route
app.get('/', (req, res) => {
	let cursor = db.collection('adresse').find().toArray((err, resultat) => {
 		if (err) return console.log(err)
  	res.render('gabarit.ejs', {adresses: resultat})  
  });
})
