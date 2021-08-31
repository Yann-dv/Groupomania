<template>
  <div class="general-footer">
    <router-link to="/login">
      <h3 class="text-center">À propos</h3>
    </router-link>
    <ul class="text-center mb-1">
      <li><a href="#" target="_blank" rel="noopener">À propos</a></li>
      <li><a href="#" target="_blank" rel="noopener">Carrières</a></li>
      <li><a href="#" target="_blank" rel="noopener">Conditions d'utilisation</a></li>
      <li><a href="#" target="_blank" rel="noopener">Politique de Contenu</a></li>
      <li><a href="#" target="_blank" rel="noopener">Politique de Confidentialité</a></li>
      <li><a href="#" target="_blank" rel="noopener">Politique de Modération</a></li>
    </ul>
    <copyright class="text-center">Groupomania Inc © 2021 . Tous droits réservés</copyright>
  </div>
</template>

<script>
export default {
 name: "Footer",
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.general-footer {
  background-color: #122442;
  margin: 0;
  width: 100%;
}
h3 {
  margin: 40px 0 0;
  text-decoration: underline;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  font-size: .85rem;
}
a {
  color: #D1515A;
}
</style>
