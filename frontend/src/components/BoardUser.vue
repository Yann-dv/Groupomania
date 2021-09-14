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
                class="form-control newTitle my-3"
                name="newCategory"
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
                type="text-area"
                class="form-control rounded my-3"
                name="newContent"
                v-model="content"
                required
              ></Field>
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
      <div class="row">
        <!--Articles list-->
        <ul
          v-if="!apiAllArticles.archived"
          class="items-list col-md-8 mx-auto col-12"
        >
          <li
            v-for="item in apiAllArticles"
            :key="item"
            v-bind:id="item.id"
            class="py-3"
          >
            <div class="card rounded">
              <div class="card-body bg-light">
                <!--Card header-->
                <div
                  class="card-header d-flex justify-content-between rounded flex-wrap"
                >
                  <span
                    class="card-title mainColored text-light rounded-pill p-2 fw-bold"
                  >
                    <font-awesome-icon icon="user" />
                    {{ item.authorName }}
                  </span>
                  <span
                    class="card-subtitle text-decoration-underline secondColored"
                    >{{ item.title }}</span
                  >
                  <span
                    v-if="item.category"
                    class="card-subtitle
                  fw-bold"
                    >#{{ item.category }}</span
                  >
                  <span class="disabled card-subtitle text-muted px-3">
                    {{ getNumberOfDays(item.createdAt, new Date()) }}</span
                  >
                  <div class="btn-group btn-resize" role="group">
                    <button
                      v-if="currentUser.id === item.authorId"
                      type="button"
                      class="btn py-1 btn-secondary dropdown-toggle my-2"
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
                        v-on:click="
                          stageToLocal({ item });
                          modalModifyPost = true;
                        "
                        class="dropdown-item"
                      >
                        Modifier mon post
                      </li>
                      <li
                        v-on:click="confirmDelete(item.id)"
                        class="dropdown-item"
                      >
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
                <div class="messagesImportation py-2 d-grid gap-2" role="group">
                  <!--Import messages from messages component-->
                  <button
                    class="btn btn-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-auto-close="false"
                    data-bs-target="#collapsedMessages"
                    aria-expanded="false"
                    aria-controls="collapsedMessages"
                  >
                    {{ countMsg(item.id) }} Réponse(s)
                  </button>
                  <Messages />
                </div>
              </div>
              <!--Body end-->
            </div>
            <!--Card end-->
          </li>
          <!--List end-->
        </ul>
        <!--Modal content for modify user's articles-->
        <teleport to="#modifyArticles">
          <!--<transition name="fade">-->
          <div v-if="modalModifyPost" class="modal">
            <div class="card rounded mx-auto col-12 col-md-8">
              <div class="card-body bg-light">
                <div class="card-header rounded mb-3 position-relative">
                  <button
                    type="button"
                    v-on:click="
                      modalModifyPost = false;
                      deleteLocalStagedPost();
                    "
                    class="btn-close position-absolute top-0 end-0"
                    aria-label="Annuler"
                  ></button>
                  <span class="card-title rounded-pill p-2 fw-bold"
                    ><font-awesome-icon icon="user" />
                    {{ currentUser.username }}</span
                  >
                  <h5>Modifier ma publication :</h5>
                  <div v-if="!successful">
                    <Form
                      @submit="
                        handleSubmit();
                        modalModifyPost = false;
                      "
                      :validation-schema="postSchema"
                      class="mx-auto col-12 col-md-8"
                      id="modifArticleForm"
                    >
                      <div class="form-group form-floating">
                        <Field
                          type="text"
                          class="form-control newTitle"
                          name="newTitle"
                          v-model="modifyingPost.title"
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
                          class="form-control newCategory my-3"
                          name="newCategory"
                          v-model="modifyingPost.category"
                        />
                        <label
                          for="newCategory"
                          class="text-decoration-underline"
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
                          class="form-control rounded"
                          name="newContent"
                          v-model="modifyingPost.content"
                          required
                        ></Field>
                        <label
                          for="newContent"
                          class="text-decoration-underline"
                          >Contenu de mon post :</label
                        >
                        <ErrorMessage
                          name="newContent"
                          class="error-feedback ms-3"
                          style="color:red"
                        />
                      </div>
                      <div class="send-btn form-group col-2 position-relative">
                        <button
                          class="btn btn-primary rounded-pill mt-2"
                          type="submit"
                        >
                          <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                          Modifier
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--</transition>-->
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
//import TokenService from "../services/token.service";
import ArticleService from "../services/article-service";
import MessageService from "../services/messages-service";
import EventBus from "../common/EventBus";
import Messages from "../components/Messages";
import Footer from "../components/Footer";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "User",
  components: {
    Messages,
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
      messagesLength: "",
      title: "",
      content: "",
      category: "",
      successful: false,
      loading: false,
      message: "",
      modifyingPost: "",
      newPost: null,
      modalModifyPost: false,
      headerColor: "#8957E5",
      mainColor: "#122442",
      secondColor: "#D1515A",
      apiAllUsers: "",
      apiAllArticles: [],
      apiAllMessages:[],
      msgByArticle: "",
    };
  },
  filters: {
    reverse(items) {
      return items.slice().reverse();
    },
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
    ),

    // Check du nombre de messages par articles
  MessageService.getLinkedMessages(2).then(
      (response) => {
        this.apiAllMessages= response.data;
        console.log(response.data)
      },
      (error) => {
        this.msgByArticle =
          (error.res && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    countMsg() {
      MessageService.getLinkedMessages().then(
        (response) => {
              this.apiAllMessages= response.data;
        },
        (error) => {
          this.apiAllMessages =
            (error.res && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        }
      )
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/home");
    },
    getNumberOfDays(start, end) {
      const date1 = new Date(start);
      const date2 = new Date(end);
      const time1 = date1.getHours();
      // One day in milliseconds
      const oneDay = 1000 * 60 * 60 * 24;
      // Calculating the time difference between two dates
      const diffInTime = date2.getTime() - date1.getTime();
      // Calculating the no. of days between two dates
      const diffInDays = Math.round(diffInTime / oneDay);
      if (diffInDays < 1) {
        return "Publié aujourd'hui à " + time1 + "h" + date1.getMinutes();
      }
      return "Publié il y a " + diffInDays + " jours";
    },
    deleteLocalStagedPost() {
      localStorage.removeItem("modifyingPost");
      this.modifyingPost = "";
    },
    stageToLocal({ item }) {
      const parsed = JSON.stringify(item);
      localStorage.setItem("modifyingPost", parsed);
      this.modifyingPost = JSON.parse(localStorage.getItem("modifyingPost"));
    },
    handleSubmit(item) {
      console.log(JSON.parse(item));
      if (confirm("Souhaitez-vous vraiment modifier votre publication ?")) {
        ArticleService.updateArticle({
          id: item.id,
          title: item.title,
          category: item.category,
          content: item.content,
          updatedAt: new Date(),
        })
        .then(() => {
          setTimeout(function(){
            window.location.reload(1);
          }, 300);
        })
      } else {
        // Code à éxécuter si l'utilisateur clique sur "Annuler"
      }
      //}
    },
    handlePost() {
      if (this.content) {
        ArticleService.createArticle({
          title: this.title,
          category: this.category,
          content: this.content,
        })
        .then(() => {
          setTimeout(function(){
            window.location.reload(1);
          }, 300);
        })
      }
    },
    confirmDelete(idToDelete) {
      if (
        confirm(
          "Souhaitez-vous vraiment supprimer votre publication et ses commentaires ? (Après confirmation, les données seront archivées et conservées pendant 30 jours avant d'être supprimées)"
        )
      ) {
        ArticleService.deleteArticle(idToDelete)
        .then(() => {
          setTimeout(function(){
            window.location.reload(1);
          }, 300);
        })
      } else {
        // Code à éxécuter si l'utilisateur clique sur "Annuler"
      }
    },
  },
}; //export end
</script>

<style>
/*.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}*/
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
</style>
