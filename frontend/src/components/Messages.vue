<template>
  <div class="collapse py-2 mt-3 mb-2" id="navbarMessages">
    <div class="bg-light">
      <h5 class="h4">Collapsed content</h5>
        <ul id="messagesUl">
          <li v-for="message in apiAllMessages"
            :key="message"
            v-bind:id="message.id"
            class="text-white"
          >
            Toggleable via the navbar brand.
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import MessageService from "../services/messages-service";

export default {
 name: "Messages",
 data() {
     return {
         apiAllMessages :"",
     }
 },
 mounted() {
     MessageService.getAllMessages().then(
      (response) => {
        this.apiAllMessages = response.data;
      },
      (error) => {
        this.apiAllMessages =
          (error.res && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
 },
}
</script>