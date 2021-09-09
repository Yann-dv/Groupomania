<template>
  <div class="container">
    <header class="jumbotron">
      <div class="text-center">
        <h2 class="fw-bold py-5">
          Bienvenue sur le forum de discussion de Groupomania,
          {{ this.currentUser.username }} !
        </h2>
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
          <h4>Partagez avec la communauté :</h4>
          <!--v-model="article"-->
          <div class="form-group form-floating">
            <Field
              type="text"
              class="form-control newCategory my-3"
              name="newTitle"
              id="new"
            />
            <label for="newTitle" class="text-decoration-underline"
              >Titre (facultatif):</label
            >
            <ErrorMessage name="newTitle" 
            class="error-feedback ms-3" 
            style="color:red" 
            />
          </div>
          <div class="form-group form-floating">
            <Field
              type="text"
              class="form-control newTitle my-3"
              name="newCategory"
            />
            <label for="newCategory" class="text-decoration-underline"
              >Catégorie (facultatif):</label
            >
            <ErrorMessage name="newCategory" 
            class="error-feedback ms-3" 
            style="color:red" 
            />
          </div>
          <div class="form-group form-floating">
            <Field component="textarea"
              rows="20"
              auto-grow
              class="form-control rounded my-3"
              name="newContent"  
              required
            ></Field>
            <label for="newContent" class="text-decoration-underline"
              >Contenu de mon post :</label
            >
            <ErrorMessage name="newContent" 
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
        </div> <!--Fin v-if successfull-->
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
      <div class="row">
        <!--Articles list-->
        <ul class="items-list col-md-8 mx-auto col-12">
          <li v-for="item in apiAllArticles" :key="item" class="py-3">
            <div class="card rounded">
              <div class="card-body bg-light">
                <!--Card header-->
                <div class="card-header rounded mb-3 position-relative">
                  <span
                    class="card-title mainColored text-light rounded-pill p-2 fw-bold"
                  >
                    <font-awesome-icon icon="user" />
                    {{ item.authorName }}
                  </span>
                  <span
                    class="ps-2 card-subtitle text-underline fw-bold secondColored"
                    >{{ item.title }}</span
                  >
                  <span
                    class="px-5 float-right position-absolute end-0 disabled text-muted"
                  >
                    {{ getNumberOfDays(item.createdAt, new Date()) }}</span
                  >
                  <div
                    class="btn-group position-absolute end-0 top-0"
                    role="group"
                  >
                    <button
                      v-if="
                        currentUser.username === item.authorName &&
                          currentUser.id === item.authorId
                      "
                      type="button"
                      class="btn btn-secondary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      id="btnGroupDropClose"
                      aria-label="Close"
                    ></button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="btnGroupDropClose"
                    >
                      <li
                        v-on:click="modalModifyPost = true"
                        class="dropdown-item"
                      >
                        Modifier mon post
                      </li>
                      <li v-on:click="deletePost" class="dropdown-item">
                        Supprimer mon post
                      </li>
                    </ul>
                  </div>
                </div>
                <!--header end-->
                <!--Card article content-->
                <div class="articleContent">
                  <p class="card-text px-5 py-2">{{ item.content }}</p>
                  <div class="likes_dislikes">
                    <font-awesome-icon
                      icon="thumbs-up"
                      class="liked"
                      style="color:#3e813e"
                    />
                    <span class="nbrOfLikes ms-1"> {{ item.likes }} </span>
                    <font-awesome-icon
                      icon="thumbs-down"
                      class="ms-2 disliked"
                      style="color:#D1515A"
                    />
                    <span class="nbrOfLikes ms-1"> {{ item.dislikes }} </span>
                  </div>
                </div>
              </div>
              <!--Body end-->
            </div>
            <!--Card end-->
          </li>
        </ul>
        <!--Modal content for modify user's articles-->
        <teleport to="#modifyArticles">
          <transition name="fade">
            <div v-if="modalModifyPost" class="modal">
              <div class="card rounded mx-auto col-12 col-md-8">
                <div class="card-body bg-light">
                  <div class="card-header rounded mb-3 position-relative">
                    <span class="card-title rounded-pill p-2 fw-bold"
                      ><font-awesome-icon icon="user" />
                      {{ currentUser.username }}</span
                    >
                    <h5>Modifier ma publication :</h5>
                    <div class="form form-floating mx-auto col-12 col-md-8">
                      <div class="modifyMyArticle">
                        <label for="modifyMyArticle">Titre (facultatif):</label>
                        <input
                          type="text"
                          class="newTitle m-3 py-2"
                          v-model="test"
                          name="modifiedTitle"
                        />
                        <textarea
                          class="form-control rounded"
                          style="min-height:14rem"
                          v-model="newPost"
                          name="modifiedContent"
                        >
                        </textarea>
                      </div>
                    </div>
                    <div
                      class="mt-3 card-buttons d-flex justify-content-between"
                    >
                      <button
                        type="button"
                        v-on:click="
                          [deleteLocalModifiedPost(), (modalModifyPost = false)]
                        "
                        class="btn-close"
                        aria-label="Annuler"
                      ></button>
                      <button
                        class="btn btn-primary rounded-pill"
                        type="submit"
                        v-on:click="
                          [
                            addModifyingPost,
                            sendModifiedPost(),
                            (modalModifyPost = false),
                          ]
                        "
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </teleport>
        <!--Modal end-->
      </div>
      <!--Grid row end-->
    </div>
    <!--Container end-->
  </div>
  <Footer />
</template>

<script>
import ArticleService from "../services/article-service";
import EventBus from "../common/EventBus";
import Footer from "../components/Footer";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "User",
  components: {
    Footer,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const postSchema = yup.object().shape({
      newtTitle:yup
      .string()
      .min(3, "Le titre doit faire au moins 3 caractères")
      .max(20, "Veuillez écrire un titre plus court"),
      newContent:yup
      .string()
      .min(3, "L'article doit faire au moins 3 caractères")
      .max(300, "L'article ne peut dépasser 300 caractères"),
    });
    return {
      postSchema,
      title: "",
      content:"",
      category: "",
      successful: false,
      loading: false,
      message: "",
      modifyingPost: [],
      newPost: null,
      modalModifyPost: false,
      headerColor: "#8957E5",
      mainColor: "#122442",
      secondColor: "#D1515A",
      apiAllUsers: "",
      apiAllArticles: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (localStorage.getItem("modifyingPost")) {
      try {
        this.modifyingPost = JSON.parse(localStorage.getItem("modifyingPost"));
      } catch (e) {
        localStorage.removeItem("modifyingPost");
      }
    }

    //let now = Date.now();
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
    getNumberOfDays(start, end) {
      const date1 = new Date(start);
      const date2 = new Date(end);

      // One day in milliseconds
      const oneDay = 1000 * 60 * 60 * 24;

      // Calculating the time difference between two dates
      const diffInTime = date2.getTime() - date1.getTime();

      // Calculating the no. of days between two dates
      const diffInDays = Math.round(diffInTime / oneDay);
      if (diffInDays < 1) {
        return "Publié aujourd'hui";
      }
      return "Publié il y a " + diffInDays + " jours";
    },
    addModifyingPost() {
      if (!this.newPost) {
        return;
      }
      this.modifyingPost.splice(0, 10, this.newPost);
      this.newPost = "";
      this.saveModifyingPost();
    },
    deleteLocalModifiedPost() {
      let postModifying = JSON.parse(localStorage.getItem("modifyingPost"));
      if (postModifying) {
        localStorage.removeItem("modifyingPost");
      }
    },
    removeModifyingPost(x) {
      this.modifyingPost.splice(x, 10);
      this.saveModifyingPost();
    },
    saveModifyingPost() {
      const parsed = JSON.stringify(this.modifyingPost);
      localStorage.setItem("modifyingPost", parsed);
    },
    handlePost() {
      ArticleService.createArticle({title: this.postSchema.newTitle, 
      content: this.postSchema.newContent})
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

.likes_dislikes {
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

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/*.modal.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 20vh;
  padding: 5px;
  background-color: green;
}*/
</style>
