
<template>
  <div class="container">
    <header class="jumbotron">
      <h2 id="vueTitle" class="mt-5 fw-bold title-content">Bienvenu sur le réseau social de Groupomania</h2>
      <div class="home-links mt-3 text-center d-flex flex-column">
          <router-link to="/login">
            <button class="btn btn-primary btn-block fs-3 mt-5 connection mt-2">Connexion</button>
          </router-link>
          <router-link to="/register">
            <button class="btn btn-secondary btn-block fs-3 mt-5 connection mt-2">Inscription</button>
          </router-link>
      </div>
    </header>
      <div>
      <!--<p>Contenu principal : {{ content }}</p>-->
      </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },

  mounted() {
    UserService.getPublicContent().then(
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
      }
    );
  },
};
</script>

<style scoped>
.title-content {
  text-align: center;
  margin-top: 1rem;
}
</style>
