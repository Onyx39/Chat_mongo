/**
 * On print dans la console ce qui se trouve dans la session de l'utilisateur
 */
async function getSession(req, res, next) {

    // On log la session (de manière formatée)
    if(req.session.pseudo === undefined)
    {
        res.json("Pas de session !")
    }else{
        res.json(req.session)
    }
    

    // On utilise la fonction next pour passer au middleware d'après ou à la fonction du routeur
    next();
}

async function isConnected(req, res, next){
    if(req.session.pseudo !== undefined)
    {
        return true
    }else{
        return false
    }
}

module.exports = {
    getSession: getSession,
    isConnected: isConnected
}