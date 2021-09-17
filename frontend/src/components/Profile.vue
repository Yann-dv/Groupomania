<template>
  <div class="container"
  v-if="!modifyProfile">
    <div class="row">
      <header class="jumbotron my-3">
        <h3>
          Mon profil : <strong>{{ currentUser.username }}</strong>
        </h3>
      </header>
      <div class="card rounded profile col-md-8 mx-auto col-12">
      <div class="card-header d-flex rounded">
        <div class="btn-group justify-content-end col-1" role="group">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle my-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="btnGroupDropClose"
              aria-label="Close"
            ></button>
              <ul class="dropdown-menu" aria-labelledby="btnGroupDropClose">
              <li v-on:click="modifyProfile = true" class="dropdown-item">
               Modifier mon profile
              </li>
              <li v-on:click="deleteProfile(currentUser.id)" class="dropdown-item">
                Supprimer mon profil
              </li>
            </ul>
          </div>
        </div>
        <p class="py-2">
          <strong>Nom d'utilisateur:</strong>
          {{ userProfile.username }}
        </p>
        <p class="py-2">
          <strong>Genre:</strong>
          {{ userProfile.gender }}
        </p>
        <p class="py-2">
          <strong>Nom :</strong>
          {{ userProfile.lastname }}
        </p>
        <p class="py-2">
          <strong>Prénom :</strong>
          {{ userProfile.firstname }}
        </p>
        <p class="py-2">
          <strong>Date de naissance :</strong>
          {{ userProfile.birthday }}
        </p>
        <p class="py-3">
          <strong>Mon adresse email:</strong>
          {{ userProfile.email }}
        </p>
        <p  type="password" class="py-2">
          <strong>Mon mot de passe :</strong>
          ************
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-12"
  v-if="modifyProfile">
    <div class="card card-container border-light">
      <Form @submit="handleModif" :validation-schema="schema" id="register-form">
        <div v-if="!successful">
        <div class="my-2 form-group gender-radios">
          <Field name="gender" type="radio" value="Homme"></Field>
          <label for="Homme" class="fs-5 ms-1">Homme</label>
          <Field name="gender" class="ms-2" type="radio" value="Femme"></Field>
          <label for="Femme" class="fs-5 ms-1">Femme</label>
            <ErrorMessage name="gender" class="error-feedback ms-3" style="color:red" />
        </div>
        <div class="form-group">
          <label for="firstName" class="fs-4 fw-bold">Prénom :</label>
          <Field name="firstname" type="text" class="form-control" v-model="currentUser.firstname"/>
          <ErrorMessage name="firstname" class="error-feedback" style="color:red" />
        </div>
        <div class="form-group">
          <label for="lastName" class="fs-4 fw-bold">Nom :</label> 
          <Field name="lastname" type="text" class="form-control" v-model="currentUser.lastname"/>
          <ErrorMessage name="lastname" class="error-feedback" style="color:red" />
        </div>
        <div class="form-group">
          <label for="birthday" class="fs-4 fw-bold">Date de naissance :</label> 
          <Field name="birthday" type="text" class="form-control" v-model="currentUser.birthday"/>
          <ErrorMessage name="birthday" class="error-feedback" style="color:red" />
        </div>
          <div class="form-group">
            <label for="username" class="fs-4 fw-bold">Identifiant</label>
            <Field name="username" type="text" class="form-control" v-model="currentUser.username" />
            <ErrorMessage name="username" class="error-feedback" style="color:red" />
          </div>
          <div class="form-group">
            <label for="email" class="fs-4 fw-bold">Email</label>
            <Field name="email" type="email" class="form-control" v-model="currentUser.email" />
            <ErrorMessage name="email" class="error-feedback" style="color:red" />
          </div>
          <div class="form-group">
            <label for="password" class="fs-4 fw-bold">Mot de passe</label>
            <Field name="password" type="password" class="form-control" placeholder="******" />
            <ErrorMessage name="password" class="error-feedback" style="color:red" />
          </div>

          <div class="form-group my-3">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Modifier mon profil
            </button>
            <button id="cancel-btn" class="mx-3 btn btn-secondary btn-block"
            v-on:click="modifyProfile= false"
            aria-label="Effacer ma saisie" value="Effacer ma saisie">Annuler</button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import TokenService from "../services/token.service";
import UserService from "../services/user-service";
import Footer from "../components/Footer";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Profile",
  components: {
    Footer,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      gender:yup
      .string(),
      //.required("Veuillez choisir une option"),
      firstname:yup
        .string()
        //.required("Veuillez entrer votre Nom")
        .max(50, "Le nom ne doit pas dépasser 50 caractères!")
        .matches(/^[aA-zZ\s]+$/, 
        "Veuillez n'utiliser que des lettres."),
      lastname:yup
        .string()
        //.required("Veuillez entrer votre Prénom")
        .max(50, "Le nom ne doit pas dépasser 50 caractères!")
        .matches(/^[aA-zZ\s]+$/, 
        "Veuillez n'utiliser que des lettres."),
      birthday:yup
        .date()
        .max(new Date(), "Date impossible car située dans le futur")
        .required("Veuillez entrez une date au format AAAA-MM-JJ, ex: 1979-12-31"),
      username: yup
        .string()
        .required("Un identifiant est requis !")
        .min(3, "L'identifiant doit contenir au moins 3 caractères!")
        .max(20, "L'identifiant ne doit pas dépasser 20 caractères!"),
      email: yup
        .string()
        .required("Un email est requis !")
        .email("Email incorrect")
        .max(50, "L'email ne doit pas dépasser 50 caractères!"),
      password: yup
        .string()
        .required("Un mot de passe est requis !")
        .min(6, "Le mot de passe doit contenir au moins 6 caractères !")
        .max(40, "L'email ne doit pas dépasser 50 caractères !"),
        //.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //"Le mot de passe doit contenir au moins 8 caractères, 1 lettre majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"),
    });
    return {
      userProfile: "",
      modifyProfile:false,
      successful: false,
      loading: false,
      message: "",
      schema,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {

    deleteProfile(userToDelete) {
      if (confirm("Souhaitez-vous vraiment supprimer ce message ?")) {
        UserService.deleteUser(userToDelete)
        .then(() => TokenService.removeUser())
      } else {
        // Code à éxécuter si l'utilisateur clique sur "Annuler"
      }
    },

    handleModif(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      if (confirm("Souhaitez-vous vraiment modifier vos informations de profil ?")) {
        UserService.updateUser(user)
        .then((data) => { 
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        })
      .then(() => {
        this.$store.dispatch("auth/login", user)      
        })
      .then(() => {
            setTimeout(function(){
            window.location.reload(1);
          }, 400); 
      })
      } else {
        // Code à éxécuter si l'utilisateur clique sur "Annuler"
        this.successful = false;
        this.loading = false;
      }
    },

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/home");
    }
      
      UserService.getUserProfile()
      .then(
        (response) => {
        this.userProfile = response.data;
        })
      },
};
</script>


<style>
.dropdown-item {
  cursor: pointer;
}
</style>