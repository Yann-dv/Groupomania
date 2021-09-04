<template>
  <div class="container">
    <header class="jumbotron">
    <a href="">
      <h3> {{ apiResponse.category }}</h3>
      </a>
      <div class="text-center">
      <h3>Bienvenue sur le forum de discussion de Groupomania !</h3>
        <ul class="list-group">
          </ul>
      </div>
    </header>
    <!--Main Dynamic content-->
    <ul>
        <li v-for="item in apiResponse" :key="item" class="item">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{item.authorName}}</h5>
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
      apiResponse: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.apiResponse = response.data;
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
        }
    );
  },
};
</script>
