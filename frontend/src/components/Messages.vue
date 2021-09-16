<template>
  <!--Messages list-->
  <div class="linkedMessageContainer">
    <ul class="collapse mx-auto" id="collapsedMessages">
      <li
        v-for="message in apiAllMessages.rows"
        :key="message"
        v-bind:id="message.id"
        class="collapsed-item my-2"
      >
        <!--<div v-if="ArticleService.getOneArticle(message.linkedArticle) === message.linked"-->
        <div class="collapsed-card card card-body">
          <div class="card-header d-flex justify-content-between">
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              v-if="currentUser.id === message.authorId"
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
      <Form
        @submit="messageSubmit"
        :validation-schema="messageSchema"
        class=""
        id="messageForm"
      >
        <div class="form-group form-floating">
          <Field
            type="text"
            class="form-control newMessage"
            name="newMessage"
          />
          <label for="newMessage" class="text-decoration-underline"
            >Répondre:</label
          >
          <ErrorMessage
            name="newMessage"
            class="error-feedback ms-3"
            style="color:red"
          />
        </div>
        <div class="send-btn form-group">
          <button class="btn btn-primary rounded my-1" type="submit">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            Poster
          </button>
        </div>
      </Form>
    </ul>
  </div>
</template>

<script>
import MessageService from "../services/messages-service";
//import ArticleService from "../services/article-service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Messages",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: ['apiAllMessages'],
  data() {
    const messageSchema = yup.object().shape({
      newMessage: yup
        .string()
        .min(1, "Veuillez écrire au moins un caractère")
        .max(60, "Veuillez écrire une réponse plus courte (max 60 caractères"),
    });
    return {
      apiAllArticles: "",
      messageSchema,
      loading: false,
      msgFromApi: "",
      //msgContentArray: [],
    };
  },
  mounted() {
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
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
    messageSubmit() {
      if (this.content) {
        MessageService.createMessage({
          linkedArticle: this.linkedArticle,
          content: this.newMessage,
        })
        .then(() => {
          setTimeout(function(){
            window.location.reload(1);
          }, 300);
        })
      }
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
