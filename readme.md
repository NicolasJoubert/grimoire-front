# Grimoire

Journal interactif de développeur, inspiré de [Notion](https://www.notion.com/fr) et d'[Obsidian](https://obsidian.md/).

Permet de prendre des notes, les liers entre elles, écrire du code, l'exécuter.

- [mongrimoire.dev](https://www.mongrimoire.dev/) (site déployé)
- [Repository backend](https://github.com/benKapl/grimoire-backend)

![Demo Grimoire](./public/demo/demo.gif?raw=true "Demo Grimoire")

> **Projet encore au stade expérimental**
>
> Grimoire est un projet que j'ai conçu pour la fin de ma formation de développeur Fullstack au sein du bootcamp [La Capsule](https://www.lacapsule.academy/) en 2024. Je l'ai développé sur une période de 9 jours pleins avec 4 développeurs de mon batch.
> 
> C'est un projet dont nous sommes très fiers étant donné l'ambition de départ et les contraintes qui étaient fixés, mais qui en l'état représente davantage une version alpha qu'une application utilisable en production :
> - Le site n'est pas responsive,
> - Il ne fonctionne pas de manière homogène entre les différents navigateurs (privilégier chrome)
> - L'UX manque de clarté en ce qui concerne l'édition de note et l'utilisation des blocs
> 
> J'ai malgré tout pris un plaisir immense à le concevoir et à le développer avec l'équipe et je suis très heureux de le présenter publiquement ici. Je le reprendrai très certainement un jour, mais pour l'instant il restera sous la forme présente.  

## **TABLE DES MATIÈRES**

### [Présentation du projet](#1-description-du-projet-1)
- [Description](#description)
- [Contraintes imposées](#contraintes-imposées)
- [Technologies utilisées](#technologies-utilisées)

### [Architecture](#architecture-1)
- [Schéma d'architecture](#schéma-darchitecture)
- [Schéma de la base de données](#schéma-de-la-base-de-données)
- [API du backend](#api-du-back-end)
- [Interface graphique](#interface-graphique)

### [Mise en production](#mise-en-production-1)
- [Schéma de l'environnement de déploiement](#schéma-de-lenvironnement-de-déploiement)
- [Mettre en place un environnement de TDD](#mettre-en-place-un-environnement-de-tdd)
- [Authentification](#authentification)

## **Présentation du projet**
### Description

Grimoire est une application web conçue pour accompagner les développeurs hommes et femmes de tous niveaux dans le quotidien de leur prise de notes. Via l’application, le développeur va pouvoir noter ses idées, ses connaissances, sa veille technologique et surtout du **code** : un éditeur de code est intégré à Grimoire et permet d’exécuter en ligne différents langages informatiques.

L’application se veut être le deuxième cerveau du développeur et lui permet de contextualiser ses écrits via : 

- un système de catégorisation libre fonctionnant par tag,  
- la possibilité de lier les notes entre elles  
- un système de calendrier permettant de suivre dans le temps la création et la mise à jour de ses notes.

### Contraintes imposées

- 9 jours de développement
- Un développement en équipe de 5 personnes  
- L’utilisation des stacks découvertes pendant le bootcamp La Capsule (10 semaines):   
  - NodeJS et ExpressJS pour le backend  
  - NodeJS et ReactJS pour le frontend  
  - Base de données MongoDB avec le librairie Mongoose  
  - Collaboration sur Github  
  - Déploiement sur Vercel  
- Utilisation du framework CSS  **Tailwind CSS** 

### Technologies utilisées

**FRONTEND**

- **React** : pour le rendu de l’application  
- **Redux**: pour stocker dans le store du navigateur des informations utilisées par un grand nombre de composants sans lien direct   
- **Tailwind CSS** : pour le formatter le style de l’application  
- **Ant Design** : pour l’import de composant complexes (popover, modales, calendrier)  
- **Font Awesome** : pour l’utilisation de pictos préconçus  
- **Moment** : pour le formatage simplifié des dates  
- [**Tiptap**](https://tiptap.dev/) : pour le formatage des blocs de texte basiques par l’utilisateur (**gras**, *italic…*)  
- [**Ace Editor**](https://ace.c9.io/) : pour styliser l’éditeur et mettre en forme du code (coloration syntaxique de multiples langages).


**BACKEND**

- **ExpressJS** : pour le routing et la gestion automatique d’un serveur back  
- **bcrypt** : pour le cryptage du mot de passe  
- **uid2** : pour la génération de token  
- **Mongoose** : pour la communication avec la base de données MongoDB  
- **JWT Token** : pour le décodage des jetons Google  
- **dotenv** : pour la gestion des variables d’environnement

**BASE DE DONNÉES**

- **MongoDB Atlas** : pour la création du Cluster  
- **MongoDB Compass** : pour la visualisation et la manipulation de la base de données

**WEBSERVICES**

- **Google Login** : pour l’inscription et la connexion via **Google**  
- [**Jdoodle**](https://www.jdoodle.com/) : pour l’exécution de code depuis la plateforme. **Jdoodle** reçoit en entrée un langage ainsi qu’une instruction, et renvoie le résultat de l’exécution tel qu’il serait affiché dans la console.



## Architecture

### Schéma d'architecture
![Schéma d'architecture](./public/demo/schema-archi.jpg?raw=true "Schéma d'architecture")

### Schéma de la base de données

La base de données MongoDB est composée de 6 collections : 

- **“users”** : données relatives aux utilisateurs, pour l’authentification et la sauvegarde des préférences,  
- **“notes”**: données relatives aux notes, principalement les métadonnées (création, modification, statut de favoris…) ainsi que les relations avec les autres notes,  
- **“blocs”** : données relatives aux blocs, le corps des notes (position, type, contenu…),  
- **“tags”** : données relatives aux tags, permettant de catégoriser une note ou plusieurs notes,  
- **“dev\_languages”** : données liées aux langages de développement, regroupe les valeurs utilisées pour l’affichage, l’utilisation de l’api d’exécution de code et la coloration syntaxique de l’éditeur de code,  
- **“editor\_themes”** : données utilisées pour le style de l’éditeur de code. 

![Schéma de la base de données](./public/demo/schema-bdd.jpg?raw=true "Schéma de la base de données")

---

### API du back-end

La structure de routes dans le backend contient 5 familles qui peuvent être regroupées dans 3 grandes catégories.

**Catégorie utilisateur**  
![api-users](./public/demo/api-users.jpg?raw=true "Catégorie utilisateurs")

**Catégorie création de contenu**  
![api-contenu](./public/demo/api-contenu.png?raw=true "Catégorie contenu")

**Catégorie “code”**
![api-dev](./public/demo/api-dev.jpg?raw=true "Catégorie code")

Cette dernière catégorie regroupe toutes les routes liées à l’utilisation du code (exécution, récupération des langages, mise à jour des thèmes, etc.

---

### **Interface graphique**

L’interface graphique est composé essentiellement de 3 parties : 

- **L’authentification**, avec les pages **Connexion** et **Inscription**,  
- La **Home**, page unique qui comprend le coeur de l’application avec la sélection, la recherche, la création et l’édition de notes,  
- Les **settings**, qui permettent à l’utilisateur de sauvegarder ses préférences et personnaliser l’interface. 

Ci-après 3 schémas qui présentent le fonctionnement de **Grimoire** côté Client.

**NAVIGATION**

![schema-navigation](./public/demo/schema-navigation.jpg?raw=true "Navigation")

Lorsqu’il arrive sur la page d’accueil de l’application, l’utilisateur non connecté arrive sur la page **SignIn** (“connection”). S’il n’a pas de compte, il peut s’en créer un sur la page **SignUp** (inscription).

Il est redirigé vers la page **Home**, page principale qui rend les composants suivants: 

- **La Note** : cœur de l’application, qui permet à l’utilisateur d’écrire du texte, du code et de l’exécuter.  
- **Searchbar** : barre de recherche permettant de retrouver facilement ses notes par titre ou par tag.   
- **SidebarRight** : barre latérale droite qui rend un calendrier permettant d’afficher, pour chaque jour, les notes créées ou mises à jour ce jour-ci.  
- **SidebarLeft** : barre latérale gauche qui liste toutes les notes créées par l’utilisateur et ses notes mises en favoris. Elle rend également le composant **ConnectedUser** qui présente le nom d’utilisateur, sa photo de profil et un bouton ⚙️.

![Home](./public/demo/home.png?raw=true "Home")

En cliquant sur le bouton ⚙️, l’utilisateur est redirigé vers la page Settings permettant de changer son nom, personnaliser son avatar, modifier son langage de code par défaut et le thème des éditeurs dans les blocs de code.

Les intéractions avec les composants **SignIn**, **SignUp** et **Settings** modifient les informations de l’utilisateur qui sont à la fois stockées dans le store et enregistrées en base de données. Le reducer **“user”** est ensuite utilisé par tous les composants liés à la Home qui ont besoin de son token pour enregistrer ses données et rendre les composants qui lui sont liés.

**RÉCUPÉRATION DES NOTES ET AFFICHAGE DE LA NOTE COURANTE**

![schema-affichage](./public/demo/schema-affichage.jpg?raw=true "Affichage des notes")

Chaque composant permettant de lister ou de rechercher des notes demande au backend la liste des notes qu’il est censé afficher. Par exemple, la SearchBar requête les notes correspondant à un certain titre pour un utilisateur données, la SidebarLeft récupère à la fois toutes les notes ainsi que les notes qui ont la propriété *isFavorite* égale à *true,* etc.

Cette liste permet au composant parent de rendre des composants **NoteLink**, constitués du titre et de l’id de chaque note. Au clic sur une **NoteLink**, l’id de la note associée est stockée dans le store dans le reducer **“currentNote”** et vient remplacer la note précédente.

![notelinks](./public/demo/notelinks.png?raw=true "NoteLinks")

A chaque modification du reducer, le composant **Note** requête au backend toutes les informations propres à la note via son **id** et est re-rendu avec ces nouvelles informations. C’est ainsi que la note change lorsque l’utilisateur clique sur un composant **NoteLink**

Enfin des boutons de création de note sont situés sur les composants **SidebarLeft** et **SearchBar**. Au clic, une note par défaut est créée en base de données, son id est stockée dans le **reducer** et la note courante est remplacée par la note nouvellement créée.

**EDITION DE LA NOTE ET RENDU DES COMPOSANTS ENFANTS**

![schema-edition](./public/demo/schema-edition.jpg?raw=true "Edition de la note")

La **Note** est le composant qui réunit le plus de complexité au sein de l’application. La majorité des intéractions entre le frontend et le backend se font depuis ce composants.

A l’exception des tags, toutes les informations liées à la note sont stockées dans un état ***noteData**,* mis à jour à chaque modification et qui permet : 

- d’**afficher les métadonnées** : titre, date de création, date de modification  
- de **lister les notes qui lui sont liées** (celle qui redirigent vers elle et celles vers lesquelles elle redirige)  
- de **rendre les blocs**.

Les blocs sont des unités d’informations qui conservent et affiche le contenu inscrit par l’utilisateur dans la note. il en existe 3 types dans le MVP : 

- le **bloc de texte**, qui utilise l’éditeur **Tiptap** pour formater du texte simple,  
- le **bloc de code**, qui utilise l’éditeur **Ace Editor** pour formater du code et qui envoie le code au backend pour exécuter les requêtes via le webservice **Jdoodle.**  
- le **bloc de lien interne**, qui permet de lier la note à une des notes existantes du Grimoire et de rendre un composant **NoteLink** à deux endroits :   
  - à la place du bloc **lien interne**, une fois la note liée sélectionnée  
  - dans la liste de l’ensemble des notes liées de la note (en bas de page)

![note-blocs](./public/demo/note-blocs.png?raw=true "Les blocs")

A chaque modification, ajout, ou suppression, chaque bloc est sauvegardé en base de données via une requête PUT et un compteur est mis à jour au niveau du composant parent (**Note**), cette modification de l’état génère une nouvelle requête de la note permettant ainsi de synchroniser en permanence l’état de la note sur le front et en base de données.

Les tags subissent un traitement différent à cause de la particularité du modèle en base de données. Aucune information sur les tags d’une note n’est accessible dans la collection ***notes**,* les notes sont liées aux tags par un tableau de clé-étrangères dans la collection ***tags***.

D’un point de vue utilisateur, la manipulation des tags est assez simple : il peut en créer, en supprimer et les visualiser directement depuis la note. Le composant **Note** appelle les routes associées à ces opérations et rend les composants **Tag** en fonction.

Enfin le composant **Note** interagit également avec le backend pour les opérations de suppression, mise en favoris et de sauvegarde. Néanmoins la sauvegarde de la note gagnerait à être optimisée étant donné qu’elle ne fait que mettre à jour le titre en base de données et modifier la date de modification de la note quand l’opération est effectuée. La fonctionnalité a été créée avant la création de la collection ***blocs*** au sprint 3 et la route est probablement appelée bien plus que nécessaire.

## **MISE EN PRODUCTION**

Le backend comme le frontend ont été déployés sur **Vercel**. La seule branche déployée étant *main*, il n’y a pas d’environnement de test ou de dev déployé, uniquement la production.

**Lien vers le backend déployé** : [https://grimoire-backend-tau.vercel.app](https://grimoire-backend-tau.vercel.app/)

**Liens vers le frontend déployé** : 

- [https://grimoire-frontend-pink.vercel.app/](https://grimoire-frontend-pink.vercel.app/) (lien Vercel)

- [https://mongrimoire.dev](https://mongrimoire.dev) (nom de domaine que nous avons acheté pour le projet)


### Schéma de l’environnement de déploiement  
     
![schema-prod](./public/demo/schema-prod.jpg?raw=true "Environnement de déploiement")

---

### **Mettre en place un environnement de TDD**

Etant donné la taille du projet et nos objectifs pour le MVP, nous n’avons pas eu le temps d’adopter une réelle approche de **Test Driven Development**. 

Une approche TDD suppose de définir en amont les objectifs techniques de chaque fonctionnalité d’une application, de rédiger les tests unitaires permettant de valider ces objectifs, puis de développer les fonctionnalités de sorte qu'elles passent ces tests.

Pour la forme, nous avons pris le soin de réaliser quelques tests unitaires dans le backend, dans un dossier ***\_\_tests\_\_*** à la racine du projet.


L’utilité de l’approche TDD et son absence dans notre manière de développer se sont réellement fait sentir vers la fin du projet. Lorsque backend comment frontend comptaient chacun plusieurs milliers de lignes de code et que les composants devenaient de plus en plus interconnectés et les routes appelées par des composants différents.  On a passé beaucoup de temps à chercher l’origine de bugs qui auraient pu être décelés rapidement et même évité avec une simple exécution des tests.

---

### **Authentification**

L’utilisateur de Grimoire peut se créer un compte et se connecter de deux manières sur l’application.

#### **Processus classique**

Lors de la première connexion, l’utilisateur doit s’inscrire avec à minima un email et un mot de passe. Un premier processus de validation est fait côté front, pour valider que l’email entré correspond bien au format attendu (via une regex récupérée sur [https://regexr.com/](https://regexr.com/)) et en demandant à l’utilisateur de saisir 2 mots de passe identiques.

Côté backend,  on vérifie que l’ema	il de l’utilisateur n’existe pas déjà en base de données. Si tel est bien le cas, deux opérations de sécurisation sont réalisées : 

- Le mot de passe est hashé 10 fois en SHA-256 avec le module **bcrypt,** permettant de le protéger contre le vol ou la compromission. Lors d’une connexion ultérieure par l’utilisateur, son mot de passe sera comparé avec le mot de passe hashé en base de données via la méthode *compareSync* de bcrypt pour valider l’authentification.

- Un token de 32 caractères créé avec le module **uid2** est stocké dans la base de données. C’est ce token qui permet d’identifier uniquement l’utilisateur et non son **\_id** MongoDB. Un identifiant unique de l’utilisateur est indispensable pour faire fonctionner l’application, et vu qu’il est accessible depuis le navigateur il est facilement récupérable par une source extérieure. Utiliser un token à la place d’un id de collection permet de le révoquer et remplacer facilement sans devoir recréer le document dans sa totalité et remplacer les clés étrangères des autres documents qui lui sont liés.

Une fois authentifié, le token de l’utilisateur est donné en réponse au frontend et stocké dans le store via **Redux.**

#### **Google Login**

Le processus d’authentification via Google est plus simple, d’un point de vue technique comme fonctionnel.

Fonctionnellement, l’utilisateur a juste à cliquer sur le bouton “Se connecter avec Google” sur la page Inscription pour s’inscrire, ou sur la page Connexion si son compte existe déjà. Une fois l’opération validée, il est authentifié.

Techniquement, lors de la demande d’authentification auprès de Google, le frontend récupère un token **JWT** (Json Web Token \- standard du marché pour transmettre des informations sécurisées sous forme de *json*) qu’il envoie au backend dans sa requête. Le backend décode ensuite le JWT (via le module **jsonwebtoken**) et si le token est valide, alors l’utilisateur est créé en base de données avec les informations récupérées (email, username, photo de profil), et un token de 32 caractères lui est attribué comme pour le processus classique.

Enfin pour la connexion le processus est strictement le même, à l’exception qu’une fois le JWT décodé, on vérifie que l’utilisateur existe déjà en base de données. S’il existe bien il est authentifié.
