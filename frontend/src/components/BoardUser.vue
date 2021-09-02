<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
      <div class="text-center">
        <ul class="list-group">
          <li class="list-group-item"><router-link to="/">
            <button class="btn btn-primary btn-block fs-3 btn-lg mt-5 connection mt-2">Connexion</button>
          </router-link></li>
          <li class="list-group-item"><router-link to="/">
            <button class="btn btn-secondary btn-block fs-3 mt-5 btn-lg connection mt-2">Inscription</button>
          </router-link></li>
          </ul>
      <!--<p>Contenu principal : {{ content }}</p>-->
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
      content: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
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
