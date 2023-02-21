const express = require("express")
const users = require("../controllers/users")
const session = require("../controllers/session");
var {sess} = require('../server.js');

const apiRouter = express.Router();

apiRouter.get("/", function (req, res) {
    res.send(req.headers);
  });

/*
apiRouter.get("/:mess", async function (req, res){
  res.send(req.params.mess)
})*/


/**
 * Créer un utilisateur
 */
apiRouter.post('/user', async (req, res) => {
  res.json(await users.createUser(req.body));
});

/**
* Récupère un utilisateur par rapport à son id
*/
apiRouter.get('/user/:userId', async (req, res) => {
  res.json(await users.findUser(req.params.userId));
});

/**
* Modifie un utilisateur par rapport à son id et le contenu de la requête
*/
apiRouter.put('/user/:userId', async (req, res) => {
  res.json(await users.updateUser(req.params.userId, req.body));
});

/**
* Supprime un utilisateur par rapport à son id
*/
apiRouter.delete('/user/:userId', async (req, res) => {
  res.json(await users.deleteUser(req.params.userId));
});

/**
* Récupère tous les utilisateurs
*/
apiRouter.get('/users', async (req, res) => {
  res.json(await users.getAllUsers());
});

apiRouter.get('/session', async (req, res) => {
  
  if(req.session === undefined)
  {
    res.send("Pas de session !")
  }else{
    res.send(req.session)
  }

})

apiRouter.post('/connect', async (req, res) => {

  var isUserFound = await users.isThisUserExist(req.body[0], req.body[1])

  if(isUserFound > 0)
  {
    sess = req.session
    sess.identifiant = req.body[0];
    res.json(sess);
  }else{
    res.json("AAAAAAAAAA")
  }

})


module.exports = apiRouter;