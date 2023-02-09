//const WebSocket = require('ws');

const MongoClient = require('mongodb').MongoClient;

uri = "mongodb://localhost:42420/mescouilles";

const client = new MongoClient(uri, { useNewUrlParser: true });

async function coucou() {
  await console.log("salut")
}

console.log("flag1")
client.connect().then(async function (){
  const db = await client.db("mescouilles");
	const collection = await db.collection("issous");
  collection.find({});
  console.log();
  await coucou();
  /*
	let cursor = collec.find({});
  console.log(cursor)
	while(await cursor.hasNext()){
		console.log(await cursor.next());
  };*/

  const cursor = await collection.findOne({});
  console.log(cursor)
});

console.log("Oui")
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
});
*/