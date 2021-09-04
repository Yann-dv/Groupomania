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
          <div class="card">
            <div class="card-body">
              <div class="card-header bg-mainColored">
                <h5 class="card-title fw-bold">{{item.authorName}}</h5>
                <span class="card-subtitle text-underline fw-bold secondColored">{{ item.title }}</span>
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
      mainColor: "#122442",
      secondColor: "#D1515A",
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

<style>
li {
  list-style-type: none;
}
.bg-mainColored{
  background-color: v-bind(mainColor);
}

.secondColored {
  color: v-bind(secondColor);
}
</style>
