<template>
  <div class="footer container-fluid footer-background py-2 mt-3 mb-2">
    <router-link to="/login">
      <h3 class="text-center fs-4">À propos</h3>
    </router-link>
    <ul class="text-center mb-1">
      <li><a href="#" target="_blank" rel="noopener">À propos</a></li>
      <li><a href="#" target="_blank" rel="noopener">Carrières</a></li>
      <li><a href="#" target="_blank" rel="noopener">Conditions d'utilisation</a></li>
      <li><a href="#" target="_blank" rel="noopener">Politique de Contenu</a></li>
      <li><a href="#" target="_blank" rel="noopener">Politique de Confidentialité</a></li>
      <li><a href="#" target="_blank" rel="noopener">Politique de Modération</a></li>
    </ul>
    <p class="text-center my-0">{{ copyright() }}</p>
  </div>
</template>

<script>
export default {
 name: "Footer",
 methods: {
    copyright() {
			const currentYear = new Date().getFullYear()
			return `Copyright: Groupomania Inc © ${currentYear}. Tous droits réservés`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-background {
  width: 100%;
  color: white;
  background-color: #122442;
}
h3 {
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
  color: white;
}
</style>
