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
              <li v-on:click="modalModifyPost = true" class="dropdown-item">
               Modifier mon post
              </li>
              <li v-on:click="deletePost" class="dropdown-item">
                Supprimer mon post
              </li>
            </ul>
          </div>
        </div>
        <p class="pt-4">
          <strong>Nom d'utilisateur:</strong>
          {{ userProfile.username }}
        </p>
        <p class="pt-4">
          <strong>Genre:</strong>
          {{ userProfile.gender }}
        </p>
        <p class="pt-4">
          <strong>Nom :</strong>
          {{ userProfile.lastname }}
        </p>
        <p class="pt-4">
          <strong>Prénom :</strong>
          {{ userProfile.firstname }}
        </p>
        <!--<p class="py-2">
          <strong>Token:</strong>
          {{ userProfile.accessToken.substring(0, 20) }} ...
          {{
            userProfile.accessToken.substr(currentUser.accessToken.length - 20)
          }}
        </p>-->
        <p class="py-2">
          <strong>Date de naissance :</strong>
          {{ userProfile.birthday }}
        </p>
        <p class="py-3">
          <strong>Mon adresse email:</strong>
          {{ userProfile.email }}
        </p>
        <p class="py-3">
          <strong>Mon mot de passe :</strong>
          {{ userProfile.password }}
        </p>
        <strong v-if="role in userProfile.roles" :key="role"
          >Authorities:</strong
        >
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
      userProfile: [],
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
      
      UserService.getuserProfile()
      .then(
        (response) => {
        this.userProfile = response.data;
        })
      },
};
</script>
