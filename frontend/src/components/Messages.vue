<template>
  <!--Messages list-->
  <div class="linkedMessageContainer">
    <ul class="collapse mx-auto" 
    v-bind:id="'collapsedMessages'+ id">
      <li
        v-for="message in apiAllMessages.rows"
        :key="message"
        v-bind:id="message.id"
        :prop="message.linkedArticle"
        class="collapsed-item my-2"

      >
        <div class="collapsed-card card card-body"
        v-if="id === message.linkedArticle">
          <div class="card-header d-flex justify-content-between">
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              v-if="currentUser.id === message.authorId || isModerator"
              v-on:click="messageDelete(message.id)"
            ></button>
            <div>
              <font-awesome-icon icon="user" /> {{ message.authorName }} :
            </div>
            <span class="disabled card-subtitle text-muted dateMini">
              {{ dateMinify(message.createdAt) }}
            </span>
          </div>
          {{ message.content }}
        </div>
      </li>
      <!--Message list end-->
      

    </ul>
  </div>
</template>

<script>
import MessageService from "../services/messages-service";
import vClickOutside from 'click-outside-vue3'

export default {
  name: "Messages",
  props: ['apiAllMessages', 'id'],
  data() {
    return {
      loading: false,
      msgFromApi: "",
    };
  },
  directives: {
      clickOutside: vClickOutside.directive
    },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isModerator() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }
      return false;
    },
  },
  methods: {
  dateMinify(messageDate) {
      let current_datetime = new Date(messageDate);
      let formatted_date =
        current_datetime.getDate() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getFullYear();
      return formatted_date;
    },
    messageDelete(messageToDelete) {
      if (confirm("Souhaitez-vous vraiment supprimer ce message ?")) {
        MessageService.deleteMessage(messageToDelete)
        .then(() => {
          setTimeout(function(){window.location.reload(1);}, 400)
        })
      } else {
        // Code à éxécuter si l'utilisateur clique sur "Annuler"
      }
    },
  },
};
</script>

<style>
.collapsed-item {
  cursor: pointer;
  width: 100%;
}

.collapsed-card {
  list-style: circle;
}

.dateMini {
  font-size: 0.8rem;
}
</style>
