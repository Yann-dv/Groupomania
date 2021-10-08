Projet 7 - Formation Développeur Web Openclassrooms


* Création d'un réseau social d'entreprise

La société Groupomania, société du secteur de la grande distribution, fait appel aux services de la société CONNECT-E
pour la création d'un réseau social d'entreprise, afin de renforcer les interactions inter-employés et la satisfation
des employés.

> Objectifs : créer une interface simple d'utilisation, avec deux aspects : un forum d'écriture/discussions autour d'articles,
et un partage de gifs avec commentaires possibles.

* Spécifications fonctionnelles : 

	- Fonctionnalités simples d'utilisation
	- Création/suppression de compte simple
	- Développement d'un forum avec contenu textuel -> forum d'articles avec commentaires
	- Dernières publications mises en avant
	- Droits admin et user de l'interface.
	- Utilisable depuis toute machine (smartphone, tablette, etc)
	
* Spécifications techniques : 
	- Technologies utilisées : Vue.js, MySQL (orm : sequelize), nodeJS + express
	- Responsive
	- Opérations CRUD avec la base de données
	- API sécurisé


* Installation : 

	- Back : npm install --save nodemon sequelize mysql2 nodemon jsonwebtoken helmet express dotenv
	cors body-parser bcryptjs async

	- Front : npm install -g @vue/cli(babel, eslint, router, vuex)
	npm install --save axios  bcryptjs bootstrap core-js dotenv jquery popper.js 
	vee-validate vue vue-router vuex yup click-outside-vue3
* Run : 
	- cd frontend - npm run serve
	- cd backend - nodemon (.env file required for development mode)

* Groupomania : 

![screen1](https://user-images.githubusercontent.com/79877110/136542882-9d18874b-8f27-472a-897d-28fdf781818d.jpg)

![screen2](https://user-images.githubusercontent.com/79877110/136542895-f3925521-ca6e-46da-88de-f3f2da543d67.jpg)


