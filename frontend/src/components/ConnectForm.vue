<template>
  <div class="ConnectForm-container">
    <h1>{{ homemsg }}</h1>
    <h3>{{ msgconnect }}</h3>
    <form id="connectForm" class="connect-form">
        <div class="identifiant">
          <label for="userId">Identifiant :</label>
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="userId" placeholder="JeanDeLaCompta" required/>
        </div>
        <div class="motdepasse">
          <label for="userPwd">Mot de passe :</label>
          <input type="text" pattern="^[a-zA-Z\\-]+$" id="userId" placeholder="groupomaniac1982" required/>
        </div>
        <div class="connectForm-btns">
          <input type="submit" id="connect" aria-label="Se connecter avec mes identifiants" value="Connection"/>
          <input type="reset" id="refresh" aria-label="Effacer ma saisie" value="Effacer"/>
        </div>
    </form>
    <h3>{{ subscrib }}</h3>
    <button class="inscription-btn">INSCRIPTION</button>
  </div>
</template>

<script>
export default {
  name: 'ConnectForm',
  props: {
    homemsg: String,
    msgconnect: String,
    subscrib: String
  }
}
</script>

<style scoped lang="scss">
.connect-form {
    display: flex;
    flex-direction:  column;
    justify-content: space-around;
}

.inscription-btn {
  font-size: 1rem;
  padding: .2rem .5rem;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
}
</style>