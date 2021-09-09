
<template>
  <div class="container">
    <header class="jumbotron">
      <h2 id="vueTitle" class="mt-5 fw-bold title-content">Bienvenu sur le réseau social de Groupomania</h2>
    </header>
      <div class="text-center">
        <ul class="list-group">
          <li class="list-group-item"><router-link to="/login">
            <button class="btn btn-primary btn-block fs-3 btn-lg mt-5 connection mt-2">Connexion</button>
          </router-link></li>
          <li class="list-group-item"><router-link to="/register">
            <button class="btn btn-secondary btn-block fs-3 mt-5 btn-lg connection mt-2">Inscription</button>
          </router-link></li>
          </ul>
      </div>
  </div>
  <Footer />
</template>

<script>
import UserService from "../services/user-service";
import Footer from "../components/Footer";

const getUser = () => {
  return JSON.parse(localStorage.getItem(`user`));
};

let activeUser = getUser();

export default {
  name: "Home",
  components: {
    Footer,
  },
  data() {
    return {
      content: "",
    };
  },

  mounted() {
    if (!activeUser) {
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
  } else if (activeUser) {
      this.$router.push("/forum");
  }
  }
};
</script>

<style scoped>
.title-content {
  text-align: center;
  margin-top: 1rem;
}
li {
  border: none;
}


</style>
