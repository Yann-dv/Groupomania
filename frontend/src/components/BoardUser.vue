<template>
  <div class="container">
    <header class="jumbotron">
      <div class="text-center">
        <h1 class="fw-bold py-5">
          Bienvenue sur le forum de discussion de Groupomania,
          {{ this.currentUser.username }} !
        </h1>
        <ul class="list-group"></ul>
      </div>
    </header>
    <!--Main Dynamic content-->

    <div class="container">
      <div class="row">
        <div v-if="!successful">
          <Form
            @submit="handlePost"
            :validation-schema="postSchema"
            class="mx-auto col-12 col-md-8"
            id="createArticleForm"
          >
            <h2>Partagez avec la communauté :</h2>
            <div class="form-group form-floating">
              <Field
                type="text"
                arial-label="Titre"
                class="form-control newCategory my-3"
                id="newTitle"
                name="newTitle"
                v-model="title"
              />
              <label for="newTitle" class="text-decoration-underline"
                >Titre (facultatif):</label
              >
              <ErrorMessage
                name="newTitle"
                class="error-feedback ms-3"
                style="color:red"
              />
            </div>
            <div class="form-group form-floating">
              <Field
                type="text"
                arial-label="Catégorie"
                class="form-control newTitle my-3"
                name="newCategory"
                id="newCategory"
                v-model="category"
              />
              <label for="newCategory" class="text-decoration-underline"
                >Catégorie (facultatif):</label
              >
              <ErrorMessage
                name="newCategory"
                class="error-feedback ms-3"
                style="color:red"
              />
            </div>
            <div class="form-group form-floating">
              <Field
                type="textarea"
                arial-label="Contenu"
                class="form-control rounded my-3"
                name="newContent"
                id="newContent"
                v-model="content"
                required
              />
              <label for="newContent" class="text-decoration-underline"
                >Contenu de mon post :</label
              >
              <ErrorMessage
                name="newContent"
                class="error-feedback ms-3"
                style="color:red"
              />
            </div>
            <div class="send-btn form-group">
              <button class="btn btn-primary rounded-pill" type="submit">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Poster
              </button>
            </div>
          </Form>
        </div>
        <!--Fin v-if successfull-->
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>
    <!--Form end-->
    <div class="container">
      <!--Import articles and messages-->
      <Articles :apiAllArticles="apiAllArticles" />
    </div>
    <!--Container end-->
  </div>
  <Footer />
</template>

<script>
import ArticleService from "../services/article-service";
import EventBus from "../common/EventBus";
import Articles from "../components/Articles";
import Footer from "../components/Footer";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "User",
  components: {
    Articles,
    Footer,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const postSchema = yup.object().shape({
      newtTitle: yup.string().max(30, "Veuillez écrire un titre plus court"),
      newCategory: yup
        .string()
        .max(30, "Veuillez écrire une catégorie plus courte"),
      newContent: yup
        .string()
        .min(3, "L'article doit faire au moins 3 caractères")
        .max(800, "L'article ne peut dépasser 800 caractères"),
    });
    return {
      postSchema,
      title: "",
      content: "",
      category: "",
      successful: false,
      loading: false,
      message: "",
      headerColor: "#8957E5",
      mainColor: "#122442",
      secondColor: "#D1515A",
      apiAllUsers: "",
      apiAllArticles: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  unmount() {
    EventBus.dispatch("logout");
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/home");
    }
    if (localStorage.getItem("modifyingPost")) {
      try {
        this.modifyingPost = JSON.parse(localStorage.getItem("modifyingPost"));
      } catch (e) {
        localStorage.removeItem("modifyingPost");
      }
    }
    ArticleService.getAllArticles().then(
      (response) => {
        this.apiAllArticles = response.data;
      },
      (error) => {
        this.apiAllArticles =
          (error.res && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.res && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      } 
    );
},
methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/home");
    },
    handlePost() {
      if (this.content) {
        ArticleService.createArticle({
          title: this.title,
          category: this.category,
          content: this.content,
        })
        .then(() => {
          
          /*setTimeout(function(){
            window.location.reload(1);
          }, 300);*/
        })
      }
    },
  },
}; //export end
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.likes_dislikes,
.dropdown-item {
  cursor: pointer;
}

textarea {
  overflow: auto;
  resize: none;
}
li {
  list-style-type: none;
}
.bg-header {
  background-color: v-bind(headerColor);
}

.mainColored {
  background-color: v-bind(mainColor);
}
</style>
