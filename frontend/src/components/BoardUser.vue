<template>
  <div class="container">
    <header class="jumbotron">
      <div class="text-center">
      <h2 class="fw-bold py-5">Bienvenue sur le forum de discussion de Groupomania !</h2>
        <ul class="list-group">
          </ul>
      </div>
    </header>
    <!--Main Dynamic content-->
    <div class="container">
      <div class="row">
        <div class="form form-floating mx-auto col-12 col-md-8">
          <div class="newArticle">
            <h4>Partagez avec la communauté :</h4>
            <textarea v-model="article" class="form-control rounded" placeholder="Ecrivez quelque chose" id="floatingTextarea"></textarea>
          </div>
          <div class="mb-3 mt-1">
            <button class="btn btn-primary rounded-pill" type="submit">Poster</button>
          </div>
        </div> <!--Form end-->
                  <span>{{newArticle}}</span>
        <ul class="items-list col-md-8 mx-auto col-12">
        <li v-for="item in apiResponse" :key="item" class="py-3">
          <div class="card rounded">
            <div class="card-body bg-light">
              <div class="card-headerv mb-3 position-relative">
                <span class="card-title mainColored text-light rounded-pill p-2 fw-bold">
                <font-awesome-icon icon="user"/>
                {{item.authorName}}
                </span>
                <span class="ps-2 card-subtitle text-underline fw-bold secondColored">{{ item.title }}</span>
                <span class="px-5 float-right position-absolute end-0 disabled text-muted">
                Publié il y a {{ postedSince }} jours</span>
              </div>
              <p class="card-text px-5 py-2">{{item.content}}</p>
            </div>
           </div>
        </li>
        </ul>
        </div> <!--Grid row end-->
      </div>
  </div>
  <Footer />
</template>

<script>
import UserService from '../services/user.service';
import EventBus from "../common/EventBus";
import Footer from "../components/Footer";

export default {
  name: "User",
  components: {
    Footer,
  },
  data() {
    return {
      headerColor: "#8957E5",
      mainColor: "#122442",
      secondColor: "#D1515A",
      postedSince:"",
      apiResponse: "",
      newArticle: [
        {
          author: "{currentUser.username}",
        }
      ]
    };
  },
  computed: {
  currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    let now = Date.now();
    UserService.getUserBoard().then(

      (response) => {
        this.apiResponse = response.data;
        let postedOn = response.data.item.createdAt;
        this.postedSince=  postedOn - now;
        
      },
      (error) => {
        this.apiResponse =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
          }
        },   
    );
  },    
};//export end
</script>

<style>
li {
  list-style-type: none;
}
.bg-header{
  background-color: v-bind(headerColor);
}

.mainColored {
  background-color: v-bind(mainColor);
}
</style>
