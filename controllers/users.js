const models = require("../models/models")
const {getKeysNotProvided, isObjectIdStringValid} = require("../utils.js");

/**
 * Créer un utilisateur
 * @param user L'utilisateur à créer
 * @returns L'utilisateur crée
 */
async function createUser(userParam) {

    // On regarde déjà si tous les champs de l'utilisateur sont présents
    const neededKeys = ["pseudo", "pass"];
    const keysNotGiven = getKeysNotProvided(neededKeys, userParam);

    // Si une ou plusieurs clefs ne sont pas données alors on renvoie un message d'erreur
    if (keysNotGiven.length !== 0) {
        return `Remplissez toutes les informations`;
    }

    const lookingForIdentifiant = await models.User.find({pseudo: userParam.pseudo}).count() 

    if(lookingForIdentifiant > 0)
    {
        return "Ce pseudo existe déjà !"
    }

    try{
        const newUser = new models.User(userParam)
        await newUser.save();
        return "Votre compte a été créé !"

    }catch(e){
        return "Impossible de créer l'utilisateur"
    }
}


async function isThisUserExist(userPseudo, userPass){

    return await models.User.find({pseudo: userPseudo, pass: userPass}).count();
}

/**
 * Lire un utilisateur par son id unique créé par MongoDB
 * @param userId L'identifiant de l'utilisateur à lire
 * @returns L'utilisateur trouvé
 */
async function findUserID(userId) {
    // On essaye de trouver l'utilisateur
    try {

        // On veut chercher un object dans la collection "User" par son identifiant MongoDB
        const userFound = await models.User.findById(userId);

        // Si l'utilisateur trouvé est null c'est qu'il n'existe pas dans la base de données
        if (userFound === null) {
            return "L'utilisateur n'existe pas"
        }

        // Sinon c'est qu'il existe et on le renvoie
        return userFound;
    }

        // S'il y a une erreur, on envoie un message à l'utilisateur
    catch (e) {
        return "Erreur lors de la recherche de l'utilisateur";
    }
}

/**
 * Mettre à jour un utilisateur
 * @param userId L'id de l'utilisateur à mettre à jour
 * @param userToUpdate Les éléments de l'utilisateur à mettre à jour
 * @returns L'utilisateur modifié
 */
async function updateUser(userId, userToUpdate) {

}

/**
 * Supprime un utilisateur
 * @param userId L'identifiant de l'utilisateur à supprimer
 * @returns L'utilisateur qui vient d'être supprimé
 */
async function deleteUser(userId) {

}

/**
 * Récupère TOUS les utilisateurs depuis la base de données
 */
async function getAllUsers() {
    // On essaye de récupérer TOUS les utilisateurs (donc on ne met pas de conditions lors de la recherche, juste un object vide)
    try {
        return await models.User.find({})
    }

        // S'il y a une erreur, on renvoie un message
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des utilisateurs";
    }
}

// On exporte les modules

module.exports.createUser = createUser;
module.exports.findUserID = findUserID;
module.exports.isThisUserExist = isThisUserExist;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getAllUsers = getAllUsers;