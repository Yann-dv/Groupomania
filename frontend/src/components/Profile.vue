<template>
  <div class="container">
    <div class="row">
      <header class="jumbotron my-3">
        <h3>
          Mon profil : <strong>{{ currentUser.username }}</strong>
        </h3>
      </header>
      <div class="card rounded profile col-md-8 mx-auto col-12">
      <div class="card-header d-flex rounded">
        <div class="btn-group justify-content-end col-1" role="group">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle my-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="btnGroupDropClose"
              aria-label="Close"
            ></button>
              <ul class="dropdown-menu" aria-labelledby="btnGroupDropClose">
              <li v-on:click="modalModifyProfile= true" class="dropdown-item">
               Modifier mon profile
              </li>
              <li v-on:click="deleteProfile" class="dropdown-item">
                Supprimer mon profile
              </li>
            </ul>
          </div>
        </div>
        <p class="py-2">
          <strong>Nom d'utilisateur:</strong>
          {{ userProfile.username }}
        </p>
        <p class="py-2">
          <strong>Genre:</strong>
          {{ userProfile.gender }}
        </p>
        <p class="py-2">
          <strong>Nom :</strong>
          {{ userProfile.lastname }}
        </p>
        <p class="py-2">
          <strong>Prénom :</strong>
          {{ userProfile.firstname }}
        </p>
        <p class="py-2">
          <strong>Date de naissance :</strong>
          {{ userProfile.birthday }}
        </p>
        <p class="py-3">
          <strong>Mon adresse email:</strong>
          {{ userProfile.email }}
        </p>
        <p  type="password" class="py-2">
          <strong>Mon mot de passe :</strong>
          ************
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import UserService from "../services/user-service";
import Footer from "../components/Footer";

export default {
  name: "Profile",
  data() {
    return {
      userProfile: "",
    }
  },
  components: {
    Footer,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/home");
    }
      
      UserService.getUserProfile()
      .then(
        (response) => {
        this.userProfile = response.data;
        })
      },
};
</script>
