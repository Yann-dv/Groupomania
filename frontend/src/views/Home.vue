<template>
  <div class="home">
    <ConnectForm homemsg="Bienvenue sur le réseau social interne de Groupomania !" 
    msgconnect="Entrez votre identifiant et votre mot de passe pour accéder à la plateforme" 
    subscrib="Si vous ne possédez pas encore de compte, inscrivez-vous pour en créer un :"/>
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
