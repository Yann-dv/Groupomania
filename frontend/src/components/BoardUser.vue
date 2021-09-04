<template>
  <div class="container">
    <header class="jumbotron">
    <a href="">
      <h3> {{ apiResponse[1].category }}</h3>
      </a>
      <div class="text-center">
        <ul class="list-group">
          <li class="list-group-item"><router-link to="/">
            <button class="btn btn-primary btn-block fs-3 btn-lg mt-5 connection mt-2">Connexion</button>
          </router-link></li>
          <li class="list-group-item"><router-link to="/">
            <button class="btn btn-secondary btn-block fs-3 mt-5 btn-lg connection mt-2">Inscription</button>
          </router-link></li>
          </ul>
      <p>Contenu principal : {{ apiResponse }}</p>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import EventBus from "../common/EventBus";

export default {
  name: "User",
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
