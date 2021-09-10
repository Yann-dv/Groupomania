<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div>
        <!--Main content-->
      </div>
  </div>
  <Footer />
</template>

<script>
//import TokenService from "../services/token.service";
import UserService from "../services/user-service";
import EventBus from "../common/EventBus";
import Footer from "../components/Footer";

export default {
  name: "User",
  components: {
    Footer,
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/home");
    }
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
