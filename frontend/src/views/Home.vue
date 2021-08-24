<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/header_logo.png">  Passé avant les onglets de vues-->
    <HelloWorld msg="Bienvenue sur le réseau social interne de Groupomania !"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
