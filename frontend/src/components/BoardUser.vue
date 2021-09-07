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
      <!--Modal content-->
      <div class="row">
        <div class="form form-floating mx-auto col-12 col-md-8">
          <div class="newArticle">
            <h4>Partagez avec la communauté :</h4>
            <!--v-model="article"--><textarea
              class="form-control rounded"
              placeholder="Ecrivez quelque chose"
              id="floatingTextarea"
            ></textarea>
          </div>
          <div class="mb-3 mt-1">
            <button class="btn btn-primary rounded-pill" type="submit">
              Poster
            </button>
          </div>
        </div>
        <!--Form end-->
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
                    Publié il y a {{ postedSince }} jours</span
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
                  <font-awesome-icon icon="home" />
                </div>
              </div>
              <!--Body end-->
            </div>
            <!--Card end-->
            <!--Modal content for modify user's articles-->
            <teleport to="#modifyArticles">
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
                          <label for="modifyMyArticle"
                            >Titre (facultatif):</label
                          >
                          <input
                            type="text"
                            class="newTitle m-3 py-2"
                            v-model="item.title"
                            id="modifyMyTitleTextArea"
                          />
                          <textarea
                            class="form-control rounded"
                            style="min-height:14rem"
                            v-model="item.content"
                            id="modifyMyArticleTextArea"
                          >
                          </textarea>
                        </div>
                      </div>
                      <div
                        class="mt-3 card-buttons d-flex justify-content-between"
                      >
                        <button
                          type="button"
                          v-on:click="modalModifyPost = false"
                          class="btn-close"
                          aria-label="Annuler"
                        ></button>
                        <button
                          class="btn btn-primary rounded-pill"
                          type="submit"
                        >
                          Valider
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </teleport>
            <!--Modal end-->
          </li>
        </ul>
      </div>
      <!--Grid row end-->
    </div>
  </div>
  <Footer />
</template>

<script>
import UserService from "../services/user.service";
import ArticleService from "../services/article.service";
import EventBus from "../common/EventBus";
import Footer from "../components/Footer";

export default {
  name: "User",
  components: {
    Footer,
  },
  data() {
    return {
      modifyMyArticleFrom: "",
      modalModifyPost: false,
      loading: false,
      headerColor: "#8957E5",
      mainColor: "#122442",
      secondColor: "#D1515A",
      postedSince: "",
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
    /*ArticleService.modifyOneArticle().then(
      (response) => {
        this.apiAllArticles = response.data;
      },
      (error) => {
        this.apiAllArticles =
          (error.res &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          if (error.res && error.response.status === 403) {
          EventBus.dispatch("logout");
          }
        },   
    );*/
    UserService.getUserBoard().then(
      (response) => {
        this.apiAllUsers = response.data;
        //let postedOn = response.data.item.createdAt;
        //this.postedSince=  postedOn - now;
      },
      (error) => {
        this.apiAllUsers =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      }
    );
  },
  methods: {
    modifyPost() {
      // to create
    },
    deletePost() {
      // to create
    },
  },
}; //export end
</script>

<style>
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

.modal + .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 20vw;
  height: 20vh;
  padding: 5px;
}
</style>
