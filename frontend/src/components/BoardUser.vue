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
    <ul class="items-list">
        <li v-for="item in apiResponse" :key="item" class="py-3">
          <div class="card rounded">
            <div class="card-body bg-light">
              <div class="card-headerv mb-3 position-relative">
                <span class="card-title bg-dark text-light rounded-pill p-2 fw-bold">
                <font-awesome-icon icon="user"/>
                {{item.authorName}}
                </span>
                <span class="ps-2 card-subtitle text-underline fw-bold secondColored">{{ item.title }}</span>
                <span class="px-5 float-right position-absolute end-0 disabled text-muted">
                Publié il y a {{ postedSince }} jours</span>
              </div>
              <p class="card-text">{{item.content}}</p>
            </div>
           </div>
        </li>
      </ul>
    <Footer />
  </div>
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
      secondColor: "#D1515A",
      postedSince:"",
      apiResponse: "",
    };
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

.secondColored {
  color: v-bind(secondColor);
}
</style>
