const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Ce schema sera utilisé pour stocker les utilisateurs
 * @schema : User
 */
const UserSchema = new Schema({

    pseudo: {
        type: Schema.Types.String,
        required: true,
        unique: true 
    },

    pass: {
        type: Schema.Types.String,
        required: true
    },

    /**
     * Ce champ sera pour savoir quand un utilisateur a été ajouté la base de données
     * Le fait de mettre 'default: Date.now' permettra de créer ce champ sans devoir le renseigner et sera la date au moment de l'ajout du document
     */
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

// On exporte le model
module.exports = {

    // On dit que le Model User est créé à partir du Schema UserSchema et le Model sera stocké dans la base de donnée MongoDB sous le nom "user"
    User: mongoose.model('user', UserSchema)
}