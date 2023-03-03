# Chat_mongo

Ce repository présente le projet du module INFO834 consacré au bases de données distribuées.
Le but est d'implémenter un système de messagerie.

## Prérequis pour utilisation
Pour utiliser ce code, vous devez avoir installé les bases de données MongoBD et Redis sur votre machine.

Vous pouvez par exemple utiliser docker et lancer ces commandes sur un terminale :

- docker run -d --name mongo-bdd -p 27017:27017 mongo

- docker run -d --name redis-bdd -p 6379:6379 redis


## Installation
Une fois le repo cloné, allez dans le dossier du répo via un terminal et runnez
```{shell}
>npm install
>npm start
```

Une fois la confirmation que tout est lancé, lancer vptre navigateur web et visiter le lien http://localhost:3000/.

Vous pouvez maintenant utiliser l'application.

