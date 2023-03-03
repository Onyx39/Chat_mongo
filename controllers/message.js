const models = require("../models/models")
const {getKeysNotProvided, isObjectIdStringValid} = require("../utils.js");

async function createMessage(messageParam) {

    // On regarde déjà si tous les champs de l'utilisateur sont présents
    const neededKeys = ["pseudo", "message"];
    const keysNotGiven = getKeysNotProvided(neededKeys, messageParam);

    // Si une ou plusieurs clefs ne sont pas données alors on renvoie un message d'erreur
    if (keysNotGiven.length !== 0) {
        return `Remplissez toutes les informations`;
    }

    const lookingForIdentifiant = await models.User.find({pseudo: messageParam.pseudo}).count() 

    if(lookingForIdentifiant > 0)
    {
        try{
            const newMessage = new models.Message(messageParam)
            await newMessage.save();
            return "ok"
    
        }catch(e){
            return "Impossible de créer le message"
        }
    }
    else
    {
        return "Pas d'utilisateur à ce nom"
    }

}

async function getallMessage(){
    try {
        return await models.Message.find({})
    }

        // S'il y a une erreur, on renvoie un message
    catch (e) {
        return "Il y a eu une erreur lors de la recuperation des messages";
    }
}

module.exports.createMessage = createMessage;
module.exports.getallMessage = getallMessage;