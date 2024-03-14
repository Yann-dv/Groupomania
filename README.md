Project 7 - Openclassrooms Web Developer Training


* Creation of a corporate social network

The company Groupomania, a company in the mass distribution sector, uses the services of the company CONNECT-E
for the creation of a corporate social network, in order to strengthen inter-employee interactions and satisfaction
employees.

> Objectives: create an easy-to-use interface, with two aspects: a forum for writing/discussions around articles,
and sharing gifs with possible comments.

* Functional Specifications :

- Easy to use features
- Simple account creation/deletion
- Development of a forum with textual content -> article forum with comments
- Latest publications highlighted
- Admin and user rights to the interface.
- Usable from any machine (smartphone, tablet, etc.)

* Technical specifications :
- Technologies used: Vue.js, MySQL (orm: sequelize), nodeJS + express
- Responsive
- CRUD operations with the database
- Secure API


* Installation & use :

- Back: npm install --save nodemon sequelize mysql2 nodemon jsonwebtoken helmet express dotenv
cors body-parser bcryptjs async

- Front: npm install -g @vue/cli(babel, eslint, router, vuex)
npm install --save axios bcryptjs bootstrap core-js dotenv jquery popper.js
vee-validate vue vue-router vuex yup click-outside-vue3
*Run:
- cd frontend - npm run serve
- cd backend - nodemon (.env file required for development mode)

* Groupomania:

![screen1](https://user-images.githubusercontent.com/79877110/136542882-9d18874b-8f27-472a-897d-28fdf781818d.jpg)

![screen2](https://user-images.githubusercontent.com/79877110/136542895-f3925521-ca6e-46da-88de-f3f2da543d67.jpg)
