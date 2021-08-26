<template>
  <div class="subscription">
    <h1>Inscription</h1>
        <h3>Veuillez remplir les champs ci-dessous</h3>
      <form id="cmdForm">
        <div>
            <input type="radio" value="male" name="sexe" id="male" autocomplete="off">
            <label for="male">Homme</label>
            <input type="radio" value="female" name="sexe" id="female" autocomplete="off">
            <label for="female">Femme</label>
        </div>
        <div>
          <label for="firstName">Prénom :</label>
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="firstName" placeholder="John" required/>
        </div>
        <div>
          <label for="lastName">Nom :</label> 
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="lastName" placeholder="Doe" required/>
        </div>
        <div>
          <label for="address" >Date de naissance :</label> 
          <input type="text" pattern="^[Z0-9-\\s]+$" id="address"  placeholder="01-01-1980" required/>
        </div>
        <div>
          <label for="email" >E-mail :</label>
          <input type="email" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="email"  placeholder="jdoe@outlook.fr" required/>
        </div>
        <div>
          <label for="identifiant" >Identifiant :</label>
          <input type="text" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="identifiant"  placeholder="JohnyDoey" required/>
        </div>
        <div>
          <label for="pwd" >Mot de passe :</label>
          <input type="text" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="pwd"  placeholder="joDoe1980+!" required/>
        </div>
        <div>
          <input type="submit" id="inscription" aria-label="Valider mon inscription" value="Valider mon inscription"/>
          <input type="reset" id="refresh-inscription"  aria-label="Effacer ma saisie" value="Effacer ma saisie"/>
        </div>
    </form>
    <Footer/>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'

export default {
  name: 'Subscribe',
  components: {
    Footer
  }
}

</script>