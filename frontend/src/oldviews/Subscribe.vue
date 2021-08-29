<template>
  <div class="subscription">
    <h1>Inscription</h1>
        <h3>Veuillez remplir les champs ci-dessous</h3>
      <div class="form-container">
      <form id="cmdForm" class="cmd-form">
        <div class="sexe">
            <input type="radio" value="male" name="sexe" id="male" autocomplete="off">
            <label for="male">Homme</label>
            <input type="radio" value="female" name="sexe" id="female" autocomplete="off">
            <label for="female">Femme</label>
        </div>
        <div>
          <label for="firstName">Prénom :</label>
          <input type="text" class="form-input" pattern="^[a-zA-Z\\-]+$" id="firstName" placeholder="John" required/>
        </div>
        <div>
          <label for="lastName">Nom :</label> 
          <input type="text" class="form-input" pattern="^[a-zA-Z\\-]+$" id="lastName" placeholder="Doe" required/>
        </div>
        <div>
          <label for="address" >Date de naissance :</label> 
          <input type="text" class="form-input" pattern="^[Z0-9-\\s]+$" id="address"  placeholder="01-01-1980" required/>
        </div>
        <div>
          <label for="email" >E-mail :</label>
          <input type="email" class="form-input" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="email"  placeholder="jdoe@outlook.fr" required/>
        </div>
        <div>
          <label for="identifiant" >Identifiant :</label>
          <input type="text" class="form-input" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="identifiant"  placeholder="JohnyDoey" required/>
        </div>
        <div>
          <label for="pwd" >Mot de passe :</label>
          <input type="text" class="form-input" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z.]{2,15}" id="pwd"  placeholder="joDoe1980+!" required/>
        </div>
        <div>
          <button type="submit" id="inscription" aria-label="Valider mon inscription" value="Valider mon inscription">Valider mon inscription</button>
          <button type="reset" id="refresh-inscription"  aria-label="Effacer ma saisie" value="Effacer ma saisie">Effacer ma saisie</button>
        </div>
    </form>
    </div>
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

<style scoped lang="scss">
h1 {
  margin-top: 0;
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 2rem;
}
.form-container {
  display: flex;
  justify-content: center;
}
.cmd-form {
  text-align: left;
}

.form-input {
  margin: .2rem;
  padding: .3rem;
  padding-left: .8rem;
  border-radius: 2rem;
}

.sexe {
  margin-bottom: .4rem;
}

label {
  font-weight: bold;
  margin-right: .5rem;
  text-decoration: underline;
}

button {
  margin-top: 1.5rem;
  margin-left: .5rem;
  font-size: 1rem;
  padding: .4rem .6rem;
  border-radius: 2rem;
  color: white;
  background-color: #122442;
  border-color: #122442;
  &:hover {
    cursor: pointer;
  }
}
</style>