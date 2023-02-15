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

/**
 * Lire un utilisateur par son id unique créé par MongoDB
 * @param userId L'identifiant de l'utilisateur à lire
 * @returns L'utilisateur trouvé
 */
async function readUser(userId) {

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
async function readAllUsers() {

}

// On exporte les modules

/*
module.exports = {
    createUser: createUser,
    readUser: readUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    readAllUsers: readAllUsers
}*/

module.exports.createUser = createUser;
module.exports.readUser = readUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.readAllUsers = readAllUsers;