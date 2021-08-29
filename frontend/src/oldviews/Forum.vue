<template>
  <div class="forum">
    <h2>Forum de discussion</h2>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'Forum',
  components: {
    Footer
  }
}
</script>