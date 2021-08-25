<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/header_logo.png">  Passé avant les onglets de vues-->
    <HomeUser msg="Bienvenue sur le réseau social interne de Groupomania !"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeUser from '@/components/HomeUser.vue'

export default {
  name: 'Home',
  components: {
    HomeUser
  }
}
</script>
