/**
 * On print dans la console ce qui se trouve dans la session de l'utilisateur
 */
async function printSession(req, res, next) {

    // On log la session (de manière formatée)
    if(req.session === undefined)
    {
        console.log("Pas de session !")
    }else{
        console.table(req.session)
    }
    

    // On utilise la fonction next pour passer au middleware d'après ou à la fonction du routeur
    next();
}

module.exports = {
    printSession: printSession
}