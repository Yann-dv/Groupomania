<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/header_logo.png">  Passé avant les onglets de vues-->
    <ConnectForm homemsg="Bienvenue sur le réseau social interne de Groupomania !" msgconnect="Entrez votre identifiant et votre mot de passe pour accéder à la plateforme"/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import ConnectForm from '@/components/ConnectForm.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    ConnectForm,
    Footer
  }
}
</script>
