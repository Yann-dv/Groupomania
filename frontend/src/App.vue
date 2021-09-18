<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <router-link to="/home" class="nav-link fs-4" v-if="!currentUser">
      <img src="./assets/banner_logo_w.png" alt="Logo Groupomania" class="px-2">
      </router-link>
      <router-link to="/forum" class="nav-link fs-4" v-if="currentUser">
      <img src="./assets/banner_logo_w.png" alt="Logo Groupomania" class="px-2">
      </router-link>
      
      <div class="navbar-nav me-auto">
        <li class="nav-item" v-if="!this.$store.state.auth.status.loggedIn">
          <router-link to="/home" class="nav-link fs-4">
            <font-awesome-icon icon="home" />Accueil
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/forum" class="nav-link fs-4">Administrateur - Forum</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/forum" class="nav-link fs-4">Moderateur- Forum</router-link>
        </li>
        <li class="nav-item" v-if="!showModeratorBoard">
          <router-link v-if="currentUser" to="/forum" class="nav-link fs-4 ps-1">Forum de discussion</router-link>
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
            <font-awesome-icon icon="user"/>

            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item pe-1">
          <a class="nav-link fs-4" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Déconnection
          </a>
        </li>
      </div>
    </nav>
    <div class="container-fluid">
      <router-view />
      
    </div> 
  </div>
</template>

<script>

import EventBus from "./common/EventBus";


export default {
  data() {
    return {
    mainColor: "#122442",
    modifyProfile: "false",
    }
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
      this.$router.push('/home');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {
  overflow-anchor: none;
} 

a {
  cursor: pointer;
}

.container {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
}
 .navbar {
    background-color: v-bind(mainColor);
}
</style>
