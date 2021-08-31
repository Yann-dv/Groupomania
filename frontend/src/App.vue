<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a href="/home">
      <img src="./assets/banner_logo_w.png" alt="Logo Groupomania" class="px-2">
      </a>
      <div class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link fs-4">
            <font-awesome-icon icon="home" />Accueil
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link fs-4">Administrateur</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link fs-4">Moderateur</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link fs-4">Utilisateur</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link fs-4">
            <font-awesome-icon icon="user-plus" /> Inscription
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link fs-4">
            <font-awesome-icon icon="sign-in-alt" /> Connection
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link fs-4">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link fs-4" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Déconnection
          </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import EventBus from "./common/EventBus";


export default {
  components: {
    Footer
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .navbar {
    background-color: #122442;
}
.footer {
  position: relative;
  bottom: 0;
  left: 0;
  
}
</style>
