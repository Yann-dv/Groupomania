<template>
  <div class="col-md-12">
    <div class="card card-container border-light">
      <img id="profile-img" class="mx-auto profile-img-card" style="max-height: 20rem; max-width: 18rem" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
      <Form @submit="handleRegister" :validation-schema="schema" id="register-form">
        <div v-if="!successful">
        <div class="sexe my-2 form-group" required>
            <input type="radio" class="me-1" value="male" name="sexe" id="male" autocomplete="off">
            <label for="male" class="fs-5">Homme</label>
            <input type="radio" class="ms-3 me-1" value="female" name="sexe" id="female" autocomplete="off">
            <label for="female" class="fs-5">Femme</label> 
        </div>
        <div class="form-group">
          <label for="firstName" class="fs-4 fw-bold">Prénom :</label>
          <Field name="firstname" type="text" class="form-control" />
          <ErrorMessage name="firstname" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="lastName" class="fs-4 fw-bold">Nom :</label> 
          <Field name="lastname" type="text" class="form-control" />
          <ErrorMessage name="lastname" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="birthday" class="fs-4 fw-bold">Date de naissance :</label> 
          <Field name="birthday" type="text" class="form-control" />
          <ErrorMessage name="birthday" class="error-feedback" />
        </div>
          <div class="form-group">
            <label for="username" class="fs-4 fw-bold">Identifiant</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email" class="fs-4 fw-bold">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password" class="fs-4 fw-bold">Mot de passe</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group my-3">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              S'inscrire
            </button>
            <button type="reset" id="refresh-inscription" class="mx-3" aria-label="Effacer ma saisie" value="Effacer ma saisie">Effacer ma saisie</button>
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
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      firstname:yup
        .string()
        .required("Vous devez entrer votre Nom")
        .max(50, "Le nom ne doit pas dépasser 50 caractères!"),
      lastname:yup
        .string()
        .required("Vous devez entrer votre Prénom")
        .max(50, "Le nom ne doit pas dépasser 50 caractères!"),
      birthday:yup
        .date()
        .required("Veuillez entrez une date au format AAAA-MM-JJ")
        .min(6, "Le mot de passe doit contenir au moins 6 caractères !")
        .max(10, "La date de naissance ne doit pas dépasser 10 caractères!"),
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
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
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
