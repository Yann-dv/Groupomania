<template>
  <div class="ConnectForm-container">
    <h1>{{ homemsg }}</h1>
    <h3>{{ msgconnect }}</h3>
    <form id="connectForm" class="connect-form">
        <div class="identifiant">
          <label for="userId" class="userId">Identifiant :</label>
          <input type="text" class="input-identifiant" pattern="^[a-zA-Z\\-]+$" id="userId" placeholder="JeanDeLaCompta" required/>
        </div>
        <div class="motdepasse">
          <label for="userPwd" class="user-pwd">Mot de passe :</label>
          <input type="text" class="input-pwd" pattern="^[a-zA-Z\\-]+$" id="userId" placeholder="groupomaniac1982" required/>
        </div>
        <div class="connectForm-btns">
          <button type="submit" class="btn-identifiant" id="connect" aria-label="Se connecter avec mes identifiants" value="Connection">Connection</button>
          <button type="reset" class="btn-reset" id="refresh" aria-label="Effacer ma saisie" value="Effacer">Effacer</button>
        </div>
    </form>
    <h3>{{ subscrib }}</h3>
    <router-link to="/subscribe">
    <button class="inscription-btn">INSCRIPTION</button>
    </router-link>
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
  padding: .6rem;
  border-radius: 2rem;
  color: white;
  background-color: #122442;
  border-color: #122442;
  &:hover {
    cursor: pointer;
  }
}

.connect-form {
  align-items: center;
}

.userId, .user-pwd {
  font-weight: bold;
}

.input-pwd, .input-identifiant {
  margin: .2rem;
  padding: .3rem;
  padding-left: .8rem;
  border-radius: 2rem;
}

.btn-reset, .btn-identifiant {
  padding: .2rem .4rem;
  margin-top: .5rem;
  margin-left: .5rem;
  border-radius: 1rem;
  color: white;
  background-color: #122442;
  border-color: #122442;
  &:hover {
    cursor: pointer;
  }
}

h1 {
  margin-top: 0;
  margin-bottom: 2rem;
}

h3 {
  text-decoration: underline;
  margin-bottom: 1.5rem;
}
</style>