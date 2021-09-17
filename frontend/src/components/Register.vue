<template>
  <div class="col-md-12">
    <div class="card card-container border-light">
      <img id="profile-img" class="mx-auto profile-img-card" style="max-height: 20rem; max-width: 18rem" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
      <Form @submit="handleRegister" :validation-schema="schema" id="register-form">
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
          <Field name="firstname" type="text" class="form-control" />
          <ErrorMessage name="firstname" class="error-feedback" style="color:red" />
        </div>
        <div class="form-group">
          <label for="lastName" class="fs-4 fw-bold">Nom :</label> 
          <Field name="lastname" type="text" class="form-control" />
          <ErrorMessage name="lastname" class="error-feedback" style="color:red" />
        </div>
        <div class="form-group">
          <label for="birthday" class="fs-4 fw-bold">Date de naissance :</label> 
          <Field name="birthday" type="text" class="form-control" />
          <ErrorMessage name="birthday" class="error-feedback" style="color:red" />
        </div>
          <div class="form-group">
            <label for="username" class="fs-4 fw-bold">Identifiant</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" style="color:red" />
          </div>
          <div class="form-group">
            <label for="email" class="fs-4 fw-bold">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" style="color:red" />
          </div>
          <div class="form-group">
            <label for="password" class="fs-4 fw-bold">Mot de passe</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" style="color:red" />
          </div>

          <div class="form-group my-3">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              S'inscrire
            </button>
            <button type="reset" id="refresh-inscription" class="mx-3 btn btn-secondary btn-block"
            aria-label="Effacer ma saisie" value="Effacer ma saisie">Effacer ma saisie</button>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Footer from "../components/Footer";

export default {
  name: "Register",
  components: {
    Footer,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      gender:yup
      .string()
      .required("Veuillez choisir une option"),
      firstname:yup
        .string()
        .required("Veuillez entrer votre Nom")
        .max(50, "Le nom ne doit pas dépasser 50 caractères!")
        .matches(/^[aA-zZ\s]+$/, 
        "Veuillez n'utiliser que des lettres."),
      lastname:yup
        .string()
        .required("Veuillez entrer votre Prénom")
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
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
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
        }
      );
    },
  },
};
</script>
