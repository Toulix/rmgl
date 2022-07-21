# Teste de compétence - Développeur full stack js
Le but de ce test est de tester les compétences du candidat en développement full stack web javascript.

## Sujet
Créer une application en temps réel qui enregistre les données de combat entre un Romain et un Gaulois en respectant les indications suivantes.

### Indication
a) Pouvoir se connecter avec deux utilisateurs différents

b) Pouvoir créer des combattants ( Gaulois, Romain ...) avec ces données à sauvegarder (chaque utilisateur pouvant créer les combattants):
- ``Nom``
- ``HP`` ( initial value = 100)
- ``MP`` ( initial value = 30 // editable et max value = 100)
- ``ST`` (initial value = 40 // editable et max value = 100)

c) Pouvoir choisir un combattant pour chaque utilisateur

d) Créer une page avec deux boutons suivant les combattants pour jouer le combat:

Gaulois:
* Frapper (button)
	* Action: HP (Romain) = HP (Romain) - ST (Gaulois)
* Lancer sort (button)
	* Action: HP (Romain) = HP (Romain) - MP (Gaulois)

Romain:
* Frapper (button)
	* Action: HP (Gaulois) = HP (Gaulois) - ST (Romain)
* Lancer sort (button)
	* Action: HP (Gaulois) = HP (Gaulois) - MP (Romain)

c) Durant le combat si le HP est < 0, afficher le gagnant.

> **Note:** La saisie sur formulaire et l'affichage peuvent être séparés par page.
> L'API créée utilisera le query language **GraphQL** sur la plateforme **Node.js** couplé au framework **VueJS**
> Le combat devrait être en temps réel

## Spec technique
* Bdd: ``Mysql``, ou ``MongoDB``;
* API Back-end: ``GrahQL``, ``Node.js``;
* API Front-end: ``VueJS``;
* Codage: ``javascript``;
* Project repository: ``Gitlab``;
* Workflow: Utiliser le système de commit et branche ``Git`` avec des pull request pour publier les changements.
* Dockeriser l'application

## Indication
Ne vous inquiétez pas si vous ne pouvez pas tout faire, faites de votre mieux :). Nous préférons de petits changements très propres et utiles plutôt que beaucoup de changements inachevés.
