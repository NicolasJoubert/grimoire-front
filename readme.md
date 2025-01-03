# Grimoire

Journal interactif de développeur, inspiré de [Notion](https://www.notion.com/fr) et d'[Obsidian](https://obsidian.md/).

Permet de prendre des notes, les liers entre elles, écrire du code, l'exécuter.

- [mongrimoire.dev](https://www.mongrimoire.dev/) (site déployé)
- [Repository backend](https://github.com/benKapl/grimoire-backend)

![Demo Grimoire](./public/demo/demo.gif?raw=true "Demo Grimoire")

> **Projet encore au stade expérimental**
>
> Grimoire est un projet que j'ai conçu pour la fin de ma formation de développeur Fullstack au sein du bootcamp) [La Capsule](https://www.lacapsule.academy/) en 2024. Je l'ai développé sur une période de 9 jours pleins avec 4 développeurs de mon batch.
> 
> C'est un projet dont nous sommes très fiers étant donné l'ambition de départ et les contraintes qui étaient fixés, mais qui en l'état représente davantage une version alpha qu'une application utilisable en production :
> - Le site n'est pas responsive,
> - Il ne fonctionne pas de manière homogène entre les différents navigateurs (privilégier chrome)
> - L'UX manque de clarté en ce qui concerne l'édition de note et l'utilisation des blocs
> 
> J'ai malgré tout pris un plaisir immense à le concevoir et à le développer avec l'équipe et je suis très heureux de le présenter publiquement ici. Je le reprendrai très certainement un jour, mais pour l'instant il restera sous la forme présente.  

**TABLE DES MATIÈRES**

1. **CONCEPTION ET MAQUETTAGE D’UNE APPLICATION**                                
   1. Descriptif du projet ………………………………………………………………………………………….. 2  
   2. Storyboard ……………………………………………………………………………………………………… 3  
   3. Panel utilisateurs …………………………………………………………………………………………….. 5  
   4. User Journeys ………………………………………………………………………………………………….. 6  
   5. Wireframes ……………………………………………………………………………………………………... 7  
   6. UI Kit …………………………………………………………………………………………………………….. 8  
   7. Maquette ………………………………………………………………………………………………………... 9  
        
2. **PILOTAGE DU PROJET D’APPLICATION WEB**                                                
   1. Préparation d’un sprint de développement ………………………………………………………… 10  
   2. Analyse des compétences nécessaires ……………………………………………………………….. 14  
   3. Schéma de la base de données ………………………………………………………………………… 14  
   4. API du back-end …………………………………………………………………………………………….  16  
        
3. **CONCEPTION ET MANIPULATION DE LA BASE DE DONNÉES / DÉVELOPPEMENT DU PROJET D’UNE APPLICATION WEB**  
   1. Déroulé des sprints de développement ……………………………………………………………… 18  
   2. Lien vers le code source de l’application ……………………………………………………………. 21  
   3. Technologies utilisées …………………………………………………………………………………….. 21  
   4. Liste des composants et librairies utilisées ………………………………………………………… 23  
   5. Schéma de l’architecture de l’application …………………………………………………………… 24  
   6. Description de l’interface graphique …………………………………………………………………. 24  
        
4. **MISE EN PRODUCTION D’UNE APPLICATION WEB**  
   1. Liens vers le site en production (Vercel) …………………………………………………………….. 30  
   2. Schéma de l’environnement de déploiement ……………………………………………………… 30  
   3. Mettre en place un environnement de TDD ………………………………………………………... 31  
   4. Authentification …………………………………………………………………………………………….. 31  
        
5. **CONCLUSION** …………………………………………………………………………………………………………… 33  
1. **CONCEPTION ET MAQUETTAGE D’UNE APPLICATION**





Mettre le lien vers le site web + lien vers le github back



   1. Descriptif du projet

Grimoire est une application web conçue pour accompagner les développeurs hommes et femmes de tous niveaux dans le quotidien de leur prise de notes. Via l’application, le développeur va pouvoir noter ses idées, ses connaissances, sa veille technologique et surtout du **code** : un éditeur de code est intégré à Grimoire et permet d’exécuter en ligne différents langages informatiques.

L’application se veut être le deuxième cerveau du développeur et lui permet de contextualiser ses écrits via : 

- un système de catégorisation libre fonctionnant par tag,  
- la possibilité de lier les notes entre elles  
- un système de calendrier permettant de suivre dans le temps la création et la mise à jour de ses notes.

Les contraintes que nous avons eu ce projet sont les suivantes : 

- 9 jours de développement
- Un développement en équipe de 5 personnes  
- L’utilisation des stacks découvertes pendant le bootcamp La Capsule (10 semaines):   
  - NodeJS et ExpressJS pour le backend  
  - NodeJS et ReactJS pour le frontend  
  - Base de données MongoDB avec le librairie Mongoose  
  - Collaboration sur Github  
  - Déploiement sur Vercel  
- Utilisation du framework CSS  **Tailwind CSS,** 

  2. Storyboard  
     
 
**Connexion / Inscription**  
![][image1]

**Home \- Note avec bloc de texte puis bloc de code**  
**![][image2]**

**Home \- Ajout d’une note liée et recherche de note**  
**![][image3]**

**Settings et modification de mot de passe**

**![][image4]**


5. Wireframes

Lors de la deuxième session de conception, nous nous sommes attaqués au wireframes et UI Kit. Une fois encore nous nous sommes répartis les tâches et deux groupes. Nicolas et moi-même nous sommes attelés à la création des wireframes, représentation schématique de l’application.   
L’outil utilisé pour cet exercice est Whimsical, recommandé par La Capsule.

**Connexion / Inscription**  
![][image7]![][image8]

**Note et Recherche**  
**![][image9]![][image10]**

**Settings et modification de mot de passe**  
**![][image11]![][image12]**

6. UI Kit

![][image13]

7. Maquette

**Note et Recherche**  
![][image14]![][image15]

**Connexion / Inscription**  
**![][image16]![][image17]**


2. **PILOTAGE DU PROJET D’APPLICATION WEB**

   1. Préparation d’un sprint de développement

Nous avons développé le projet en 5 sprints de 2 jours. Au total plus de 70 users stories (US) ont été rédigées, et près de 60 ont été réalisées. Elles ont été réparties sur chaque sprint en fonction de leur priorité dans le cadre du projet global et des dépendances avec les autres US.

Afin de faciliter le processus de priorisation et d’assignation, nous avons englobé les US dans cinq EPICS représentant chacun des composants majeurs de l’application : 

- **Authentification et Settings** : Pages de connexion, d’inscription et de paramétrage du compte.  
- **SidebarLeft** : barre latérale gauche de la Home, comprenant notamment la liste des notes et les favoris.  
- **SidebarRight** : barre latérale droite comprenant les notes du jour et le calendrier.  
- **Searchbar** : barre de recherche, permettant de retrouver les notes par titre et par tag.  
- **La Note**: tout ce qui touche à la création, édition, manipulation et suppression de note.

Étant donné leur nombre, les US sont nommés par un titre simple et court permettant de comprendre tout de suite son scope. Chaque US est cliquable et contient les informations nécessaires pour le développement de la fonctionnalité :  description, critères d’acceptation, tâches techniques, lien vers les assets du projet (maquette, ui kit …).

Exemple de user story: [**Sign up**](https://blush-tarragon-b5d.notion.site/Sign-up-1541528f38f58024b4f6d0e91fd8d134)


**Lien vers le backlog et les différents vues des sprint :**  
[https://blush-tarragon-b5d.notion.site/1541528f38f580149ec9fd15291169ff?v=1541528f38f580ccae38000cdf8722f8](https://blush-tarragon-b5d.notion.site/1541528f38f580149ec9fd15291169ff?v=1541528f38f580ccae38000cdf8722f8) 



3. Schéma de la base de données

La base de données MongoDB est composée de 6 collections : 

- **“users”** : données relatives aux utilisateurs, pour l’authentification et la sauvegarde des préférences,  
- **“notes”**: données relatives aux notes, principalement les métadonnées (création, modification, statut de favoris…) ainsi que les relations avec les autres notes,  
- **“blocs”** : données relatives aux blocs, le corps des notes (position, type, contenu…),  
- **“tags”** : données relatives aux tags, permettant de catégoriser une note ou plusieurs notes,  
- **“dev\_languages”** : données liées aux langages de développement, regroupe les valeurs utilisées pour l’affichage, l’utilisation de l’api d’exécution de code et la coloration syntaxique de l’éditeur de code,  
- **“editor\_themes”** : données utilisées pour le style de l’éditeur de code. 

Chaque collection regroupant des données pouvant être exploitées par de multiples documents de différentes collections (voir de la même collection dans le cas des **notes**), aucun sous-document n’a été créé. Toutes les relations entre les collections se basent sur un système de clé-étrangère, ce qui permet plus de flexibilité en cas d’évolution du modèle de données. Cela a été notamment utile dans le cas des **blocs** qui ont nécessité des changements de modèle pour faire face à des difficultés techniques imprévues au niveau des librairies tierces.  
**Voici le schéma final de notre base de données :** 

![][image24]


4. API du back-end

Notre structure de routes dans le backend contient 5 familles qui peuvent être regroupées dans 3 grandes catégories.

**Catégorie utilisateur**  
**![][image25]**

**Catégorie création de contenu**  
**Catégorie “code”**

Cette dernière catégorie regroupe toutes les routes liées à l’utilisation du code (exécution, récupération des langages, mise à jour des thèmes, etc.

**![][image26]**



3. **CONCEPTION ET MANIPULATION DE LA BASE DE DONNÉES / DÉVELOPPEMENT DU PROJET D’UNE APPLICATION WEB**

3. Technologies utilisées

**FRONTEND**

- **React** : pour le rendu de l’application  
- **Redux**: pour stocker dans le store du navigateur des informations utilisées par un grand nombre de composants sans lien direct   
- **Tailwind CSS** : pour le formatter le style de l’application  
- **Ant Design** : pour l’import de composant complexes (popover, modales, calendrier)  
- **Font Awesome** : pour l’utilisation de pictos préconçus  
- **Moment** : pour le formatage simplifié des dates  
- [**Tiptap**](https://tiptap.dev/) : pour le formatage des blocs de texte basiques par l’utilisateur (**gras**, *italic…*)  
- [**Ace Editor**](https://ace.c9.io/) : pour styliser l’éditeur et mettre en forme du code (coloration syntaxique de multiples langages).

NB: A l’origine l’édition de code devait également être gérée par Tiptap, librairie très complète permettant de créer un véritable *Notion-like* en matière d’édition (mise en forme de texte, de code, de titres, de checkbox, de liste dynamiques, de déplacements de blocs, etc.). Malheureusement malgré mes recherches préalables, je me suis rendu compte durant le projet que Tiptap présentait deux inconvénients majeurs : 

- Pour réellement parvenir à utiliser cette librairie, je devais également maîtriser [*prosemirror*](https://prosemirror.net/)  sur laquelle elle s’appuie, ce qui était impossible dans le temps imparti.  
- Notre système de blocs “fait maison” en composant enfants de la note entrait en conflit avec le système de *nodes* sur lequel Tiptap s’appuie.

Ainsi, plutôt que de revoir toute l’architecture en cours de projet, on a simplifié le projet en optant pour **Ace Editor** côté code, librairie bien plus simple à prendre en main, quitte à ajouter une dépendance supplémentaire au projet et un peu de complexité supplémentaire côté code.

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

4. Liste des composants et librairies utilisées

**Composant et Reducers** 		        **Dépendances Frontend**			**Dépendances Backend**

5. Schéma de l’architecture de l’application  
   

![][image27]

6. Description de l’interface graphique

L’interface graphique est composé essentiellement de 3 parties : 

- **L’authentification**, avec les pages **Connexion** et **Inscription**,  
- La **Home**, page unique qui comprend le coeur de l’application avec la sélection, la recherche, la création et l’édition de notes,  
- Les **settings**, qui permettent à l’utilisateur de sauvegarder ses préférences et personnaliser l’interface. 

Ci-après 3 schémas qui présentent le fonctionnement de **Grimoire** côté Client.

**NAVIGATION**

![][image28]

Lorsqu’il arrive sur la page d’accueil de l’application, l’utilisateur non connecté arrive sur la page **SignIn** (“connection”). S’il n’a pas de compte, il peut s’en créer un sur la page **SignUp** (inscription).

![][image29]     ![][image30]

Il est redirigé vers la page **Home**, page principale qui rend les composants suivants: 

- **La Note** : cœur de l’application, qui permet à l’utilisateur d’écrire du texte, du code et de l’exécuter.  
- **Searchbar** : barre de recherche permettant de retrouver facilement ses notes par titre ou par tag.   
- **SidebarRight** : barre latérale droite qui rend un calendrier permettant d’afficher, pour chaque jour, les notes créées ou mises à jour ce jour-ci.  
- **SidebarLeft** : barre latérale gauche qui liste toutes les notes créées par l’utilisateur et ses notes mises en favoris. Elle rend également le composant **ConnectedUser** qui présente le nom d’utilisateur, sa photo de profil et un bouton ⚙️.

![][image31]

En cliquant sur le bouton ⚙️, l’utilisateur est redirigé vers la page Settings permettant de changer son nom, personnaliser son avatar, modifier son langage de code par défaut et le thème des éditeurs dans les blocs de code.

Les intéractions avec les composants **SignIn**, **SignUp** et **Settings** modifient les informations de l’utilisateur qui sont à la fois stockées dans le store et enregistrées en base de données. Le reducer **“user”** est ensuite utilisé par tous les composants liés à la Home qui ont besoin de son token pour enregistrer ses données et rendre les composants qui lui sont liés.

**RÉCUPÉRATION DES NOTES ET AFFICHAGE DE LA NOTE COURANTE**

![][image32]

Chaque composant permettant de lister ou de rechercher des notes demande au backend la liste des notes qu’il est censé afficher. Par exemple, la SearchBar requête les notes correspondant à un certain titre pour un utilisateur données, la SidebarLeft récupère à la fois toutes les notes ainsi que les notes qui ont la propriété *isFavorite* égale à *true,* etc.

Cette liste permet au composant parent de rendre des composants **NoteLink**, constitués du titre et de l’id de chaque note. Au clic sur une **NoteLink**, l’id de la note associée est stockée dans le store dans le reducer **“currentNote”** et vient remplacer la note précédente

A chaque modification du reducer, le composant **Note** requête au backend toutes les informations propres à la note via son **id** et est re-rendu avec ces nouvelles informations. C’est ainsi que la note change lorsque l’utilisateur clique sur un composant **NoteLink**

Enfin des boutons de création de note sont situés sur les composants **SidebarLeft** et **SearchBar**. Au clic, une note par défaut est créée en base de données, son id est stockée dans le **reducer** et la note courante est remplacée par la note nouvellement créée.

**EDITION DE LA NOTE ET RENDU DES COMPOSANTS ENFANTS**

![][image33]

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

A chaque modification, ajout, ou suppression, chaque bloc est sauvegardé en base de données via une requête PUT et un compteur est mis à jour au niveau du composant parent (**Note**), cette modification de l’état génère une nouvelle requête de la note permettant ainsi de synchroniser en permanence l’état de la note sur le front et en base de données.

Les tags subissent un traitement différent à cause de la particularité du modèle en base de données. Aucune information sur les tags d’une note n’est accessible dans la collection ***notes**,* les notes sont liées aux tags par un tableau de clé-étrangères dans la collection ***tags***.

D’un point de vue utilisateur, la manipulation des tags est assez simple : il peut en créer, en supprimer et les visualiser directement depuis la note. Le composant **Note** appelle les routes associées à ces opérations et rend les composants **Tag** en fonction.

Enfin le composant **Note** interagit également avec le backend pour les opérations de suppression, mise en favoris et de sauvegarde. Néanmoins la sauvegarde de la note gagnerait à être optimisée étant donné qu’elle ne fait que mettre à jour le titre en base de données et modifier la date de modification de la note quand l’opération est effectuée. La fonctionnalité a été créée avant la création de la collection ***blocs*** au sprint 3 et la route est probablement appelée bien plus que nécessaire.

4. **MISE EN PRODUCTION D’UNE APPLICATION WEB**

   1. Liens vers le site en production (Vercel)

Le backend comme le frontend ont été déployés sur **Vercel**. La seule branche déployée étant *main*, il n’y a pas d’environnement de test ou de dev déployé, uniquement la production.

**Lien vers le backend déployé** : [https://grimoire-backend-tau.vercel.app](https://grimoire-backend-tau.vercel.app/)

**Liens vers le frontend déployé** : 

- [https://grimoire-frontend-pink.vercel.app/](https://grimoire-frontend-pink.vercel.app/) (lien Vercel)

- [https://mongrimoire.dev](https://mongrimoire.dev) (nom de domaine que nous avons acheté pour le projet)


  2. Schéma de l’environnement de déploiement  
     

![][image34]

3. Mettre en place un environnement de TDD

Etant donné la taille du projet et nos objectifs pour le MVP, nous n’avons pas eu le temps d’adopter une réelle approche de **Test Driven Development**. 

Une approche TDD suppose de définir en amont les objectifs techniques de chaque fonctionnalité d’une application, de rédiger les tests unitaires permettant de valider ces objectifs, puis de développer les fonctionnalités de sorte qu'elles passent ces tests.

Pour la forme, nous avons pris le soin de réaliser quelques tests unitaires dans le backend, dans un dossier ***\_\_tests\_\_*** à la racine du projet.

**\<- Exemple de test pour valider le changement de position des blocs lors d’un ajout** 

L’utilité de l’approche TDD et son absence dans notre manière de développer se sont réellement fait sentir vers la fin du projet. Lorsque backend comment frontend comptaient chacun plusieurs milliers de lignes de code et que les composants devenaient de plus en plus interconnectés et les routes appelées par des composants différents.  On a passé beaucoup de temps à chercher l’origine de bugs qui auraient pu être décelés rapidement et même évité avec une simple exécution des tests.

4. Authentification

L’utilisateur de Grimoire peut se créer un compte et se connecter de deux manières sur l’application.

1. Processus classique

Lors de la première connexion, l’utilisateur doit s’inscrire avec à minima un email et un mot de passe. Un premier processus de validation est fait côté front, pour valider que l’email entré correspond bien au format attendu (via une regex récupérée sur [https://regexr.com/](https://regexr.com/)) et en demandant à l’utilisateur de saisir 2 mots de passe identiques.

Côté backend,  on vérifie que l’ema	il de l’utilisateur n’existe pas déjà en base de données. Si tel est bien le cas, deux opérations de sécurisation sont réalisées : 

- Le mot de passe est hashé 10 fois en SHA-256 avec le module **bcrypt,** permettant de le protéger contre le vol ou la compromission. Lors d’une connexion ultérieure par l’utilisateur, son mot de passe sera comparé avec le mot de passe hashé en base de données via la méthode *compareSync* de bcrypt pour valider l’authentification.

- Un token de 32 caractères créé avec le module **uid2** est stocké dans la base de données. C’est ce token qui permet d’identifier uniquement l’utilisateur et non son **\_id** MongoDB. Un identifiant unique de l’utilisateur est indispensable pour faire fonctionner l’application, et vu qu’il est accessible depuis le navigateur il est facilement récupérable par une source extérieure. Utiliser un token à la place d’un id de collection permet de le révoquer et remplacer facilement sans devoir recréer le document dans sa totalité et remplacer les clés étrangères des autres documents qui lui sont liés.

Une fois authentifié, le token de l’utilisateur est donné en réponse au frontend et stocké dans le store via **Redux.**

2. Google Login

Le processus d’authentification via Google est plus simple, d’un point de vue technique comme fonctionnel.

Fonctionnellement, l’utilisateur a juste à cliquer sur le bouton “Se connecter avec Google” sur la page Inscription pour s’inscrire, ou sur la page Connexion si son compte existe déjà. Une fois l’opération validée, il est authentifié.

Techniquement, lors de la demande d’authentification auprès de Google, le frontend récupère un token **JWT** (Json Web Token \- standard du marché pour transmettre des informations sécurisées sous forme de *json*) qu’il envoie au backend dans sa requête. Le backend décode ensuite le JWT (via le module **jsonwebtoken**) et si le token est valide, alors l’utilisateur est créé en base de données avec les informations récupérées (email, username, photo de profil), et un token de 32 caractères lui est attribué comme pour le processus classique.

Enfin pour la connexion le processus est strictement le même, à l’exception qu’une fois le JWT décodé, on vérifie que l’utilisateur existe déjà en base de données. S’il existe bien il est authentifié.
