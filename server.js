const WebSocket = require('ws');

const redis = require("redis");
const connectRedis = require("connect-redis");
const express = require("express");
const http = require("http")
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose")

// PARTIE SERVEUR

const apiRouter = require("./routes/api")
const viewRouter = require("./routes/views")


const app = express();

// On configure le server
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));


// Crée un serveur HTTP
const server = http.createServer(app);

// On allume le serveur au port 3000
server.listen(3000);

// Quand le serveur est allumé on le log
server.on('listening', function () {
    console.log("Le serveur est allumé");
});

// Si il y a une erreur on la log
server.on('error', function (error) {
    console.error(error);
});

app.use("/api", apiRouter)
app.use("/", viewRouter)

// PARTIE MONGO

// Les options à donner à MongoDB
const options = {
  keepAlive: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// L'host, c'est-à-dire l'adresse d'où se trouve la base MongoDB
// La notation a = b || c en JS veut dire, j'affecte à a la valeur de b si elle existe (non chaine de caractère vide, non null et non undefined), sinon je prends la valeur c
// Il faut lire ça: mongoDBHost est la variable d'environnement MONGO_HOST si elle est définie sinon c'est "localhost"
const mongoDBHost = process.env.MONGO_HOST || "localhost";

/*
Connexion à Mongodb avec les options définies auparavant
- mongodb : est le protocol que MongoDB utilise pour se connecter, comme http ou ssh par exemple (ne bouge jamais)
- mongoDBHost : est l'adresse locale d'où se trouve la base de données (localhost), et si la variable d'environnement MONGO_HOST existe et n'est pas vide alors on prendra cette valeur la => utilisé pour docker
- 27017 : est le port où MongoDB écoute (c'est le port par défaut)
- maBaseDeDonnee : est le nom de la base de données, il peut être ce que vous voulez
*/
mongoose.connect(`mongodb://${mongoDBHost}:27017/mongoChatIDU`, options, function (err) {
  if (err) {
      throw err;
  }
  console.log('Connexion à Mongodb réussie');
});


// PARTIE REDIS

// L'host, c'est-à-dire l'adresse d'où se trouve la base Redis
// La notation a = b || c en JS veut dire, j'affecte à a la valeur de b si elle existe (non chaine de caractère vide, non null et non undefined), sinon je prends la valeur c
// Il faut lire ça: mongoDBHost est la variable d'environnement REDIS_HOST si elle est définie sinon c'est "localhost"

//const redisHost = process.env.REDIS_HOST || "localhost";

// On configure le client Redis
/*const redisClient = redis.createClient({

    // L'adresse où se trouve la base de données Redis
    host: redisHost,

    // Le port de la base de données
    port: 6379
});
*/
// S'il y a une erreur on veut dire laquelle

/*
redisClient.on('error', (err) => {
    console.log("Impossible d'établir une connexion avec redis. " + err);
});*/

// Si la connection est un succès, on veut le dire
/*redisClient.on('connect', () => {
    console.log("Connexion à redis avec succès");
});*/


/*

const server = new WebSocket.Server({ port: 4420 });

server.on('connection', (socket) => {
  console.log('Client connecté');

  socket.on('message', (message) => {
    console.log(`Message reçu du client : ${message}`);
  });

  socket.on('close', () => {
    console.log('Client déconnecté');
  });
});*/