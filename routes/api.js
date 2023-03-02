const express = require("express")
const users = require("../controllers/users");
const session = require("../middlewares/session");
//var {sess} = require('../server.js');

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

  result = await session.isConnected(req);
  
  if(result)
  {
    res.json("ok")
  }else{
    
    res.json("Pas de session !")
  }

})

/**
 * Détruis la session
 */
apiRouter.delete('/session', (req, res) => {

  // S'il n'y a pas de session, on renvoie un message
  if (req.session === undefined) {
      res.json("Il n'y a pas de session à détuire")
  }

  // Si elle est existe alors on peut la détruire
  else {
      req.session.destroy()
      res.json("La session a été détruite !");
  }
});

apiRouter.post('/connect', async (req, res) => {

  var isUserFound = await users.isThisUserExist(req.body.pseudo, req.body.pass)

  if(isUserFound > 0)
  {
    req.session.pseudo = req.body.pseudo;
    res.json("ok");
  }else{
    req.session.destroy()
    res.json("Impossible de se connecter !")
  }

})


module.exports = apiRouter;