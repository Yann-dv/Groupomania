<template>
  <div class="about">
    <h1>À propos</h1>
    <Footer/>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'

export default {
  name: 'About',
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
</style>