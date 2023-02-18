const express = require("express")
const users = require("../controllers/users")

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



module.exports = apiRouter;