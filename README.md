Projet 7 - Formation Développeur Web Openclassrooms


* Création d'un réseau social d'entreprise

La société Groupomania, société du secteur de la grande distribution, fait appel aux services de la société CONNECT-E
pour la création d'un réseau social d'entreprise, afin de renforcer les interactions inter-employés et la satisfation
des employés.

> Objectifs : créer une interface simple d'utilisation, avec deux aspects : un forum d'écriture/discussions autour d'articles,
et un partage de gifs avec commentaires possibles.
> Aspects techniques : fonctionnalités simple d'utilisation, création/suppression de compte simple, 1 forum avec contenu textuel et
1 autre avec contenu multimédia, dernières publications mises en avant, droits admin et user de la DB.

> Technologies utilisées : Vue.js, MySQL (orm : sequelize), nodeJS + express


*Setup : 

- Back : npm install --save sequelize mysql2 nodemon jsonwebtoken helmet express dotenv
	cors body-parser bcryptjs async

- Front : npm install -g @vue/cli(babel, eslint, router, vuex)
	npm install --save axios  bcryptjs bootstrap core-js dotenv jquery popper.js 
	vee-validate vue vue-router vuex yup

