const WebSocket = require('ws');

const express = require("express");
const http = require("http")
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose")
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

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


/* ========== PARTIE REDIS ========== */

// On crée l'object qui nous permettra de gérer les sessions avec Redis
const RedisStore = connectRedis(session)

// L'host, c'est-à-dire l'adresse d'où se trouve la base Redis
// La notation a = b || c en JS veut dire, j'affecte à a la valeur de b si elle existe (non chaine de caractère vide, non null et non undefined), sinon je prends la valeur c
// Il faut lire ça: mongoDBHost est la variable d'environnement REDIS_HOST si elle est définie sinon c'est "localhost"
const redisHost = process.env.REDIS_HOST || "localhost";

// On configure le client Redis
const redisClient = redis.createClient({ host: redisHost, port: 6379 })

// S'il y a une erreur on veut dire laquelle
redisClient.on('error', (err) => {
    console.log("Impossible d'établir une connexion avec redis. " + err);
});

// Si la connection est un succès, on veut le dire
redisClient.on('connect', () => {
    console.log("Connexion à redis avec succès");
});

// On configure le middleware de session, ce qui servira pour ajouter un object session qui sera disponible à chaque requête
app.use(session({

  // On utilise redis pour stocker les sessions utilisateur
  store: new RedisStore({client: redisClient}),

  // C'est ce qui permet d'encoder et décoder les sessions pour des raisons de sécurité évidentes (il doit être méconnu de tous pour ne pas se faire pirater)
  secret: "JeSuisSecret!",

  // Le domain (le début de l'URL) sur lequel la session doit être active, si votre site est https://test.com
  // le domaine sera "test.com" mais comme on fait du devloppement en local, ici il le domain est "localhost"
  domain: "localhost",

  // Quelques autres options
  resave: false,
  saveUninitialized: false,
  proxy: true,

  // Le cookie qui servira à stocker la session
  cookie: {

      // Si vrai, ne transmettre le cookie que par https.
      // On est en développement donc juste en http, on doit donc mettre false
      secure: false,

      // Si vrai, empêche le JS côté client de lire le cookie
      // Comme on est en développement, on peut le mettre à false, mais en production il doit être à true
      httpOnly: false,

      // La durée de vie de la session en millisecondes, après ce délai la session sera détruite, il faudra par exemple se reconnecter pour se recréer une session
      maxAge: 86400000, // 86400000ms = 1 jour

      // On laisse le même domaine que dans les options plus haut
      domain: "localhost"
  },
}));

// Routers uses

app.use("/api", apiRouter)
app.use("/", viewRouter)



// Partie WEBSOCKET

const message = require("./controllers/message");

const wsServer = new WebSocket.Server({ port: 4420 })

wsServer.on('connection', async (socket, req) => {

  // recevoir tous les messages
    const allMessage = await message.getallMessage();
    const jsonData = JSON.stringify(allMessage);
    socket.send(jsonData);

    socket.on('message', async (mess) => {
    console.log(`Message reçu du client : ${mess}`);

    //enregistrer

    const messageJSON = JSON.parse(mess)

    const responseCreation = await message.createMessage(messageJSON);

    console.log(responseCreation);

    // recevoir tous les messages
    const allMessage = await message.getallMessage();
    const jsonData = JSON.stringify(allMessage);
    // Envoyer un message à tous les sockets
    wsServer.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonData);
    }
    });
  });
  socket.on('close', () => {
    console.log('Client déconnecté');
  });

});
