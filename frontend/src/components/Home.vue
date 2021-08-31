
<template>
  <div class="container">
    <header class="jumbotron">
      <h2 class="fw-bold title-content">{{ content }}</h2>
    </header>
      <div>
      <p>Contenu principal</p>
      </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  component: Footer,

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
