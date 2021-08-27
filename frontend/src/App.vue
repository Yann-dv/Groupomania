<template>
  <div id="nav">
    <div class="header_logo">
    <img class="banner-logo" src="./assets/banner_logo.png">
    </div>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/subscribe">Inscription</router-link> |
    <router-link to="/about">À propos</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">

body {
  background: #D8D8D8;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: #D1515A;
    }
  }
}

.banner-logo {
  max-width: 100%;
  max-height: 8rem;
}
</style>
