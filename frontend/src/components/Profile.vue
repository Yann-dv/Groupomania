<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Mon profil : <strong>{{ currentUser.username }}</strong> 
      </h3>
    </header>
    <p class="pt-4">
      <strong>Nom d'utilisateur:</strong>
      {{ currentUser.username }}
    </p>
    <p class="pt-4">
      <strong>Genre:</strong>
      {{ currentUser.gender }}
    </p>
    <p class="py-2">
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p class="py-2">
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p class="py-3">
      <strong>Mon adresse email:</strong>
      {{currentUser.email}}
    </p>
    <strong v-if="role in currentUser.roles" :key="role">Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul>
  </div>
  <Footer />
</template>

<script>
import Footer from "../components/Footer";

export default {
  name: 'Profile',
  components: {
    Footer,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/home');
    }
  }
};
</script>