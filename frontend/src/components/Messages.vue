<!--<template>
  <div class="collapse py-2 mt-3 mb-2" id="navbarMessages">
    <div class="bg-light">
        <ul id="messagesUl">
          <li v-for="item in apiAllMessages"
            :key="item"
            v-bind:id="item.id"
            class="text-white"
          >
            Toggleable via the navbar brand.
            </li>
        </ul>
    </div>
  </div>
</template>-->
<template>
  <div class="py-2 d-grid gap-2" role="group">
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-auto-close="false"
      data-bs-target="#collapsedMessages"
      aria-expanded="false"
      aria-controls="collapsedMessages"
    >
      {{ apiAllMessages.length }} Réponse(s)
    </button>
    <!--Messages list-->
    <ul class="collapse mx-auto" id="collapsedMessages">
      <li
        v-for="message in apiAllMessages"
        :key="message"
        v-bind:id="message.id"
        class="collapsed-item my-2"
       >
        <div class="collapsed-card card card-body">
          <div class="card-header d-flex justify-content-between">
            <div><font-awesome-icon icon="user" />
              {{ message.authorName }} :
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
            id="createArticleForm"
          >
            <div class="form-group form-floating">
              <Field
                type="text"
                class="form-control newMessage"
                name="newTitle"
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Messages",
  components : {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const messageSchema = yup.object().shape({
      newMessage: yup
      .string()
      .min(1, "Veuillez écrire au moins un caractère")
      .max(60, "Veuillez écrire une réponse plus courte (max 60 caractères"),
    });
    return {
      apiAllMessages: "",
      messageSchema,
      loading: false,
    };
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
  methods: {
    dateMinify(messageDate) {
      let current_datetime = new Date(messageDate)
      let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
      return formatted_date;

    }
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
  font-size: .8rem;
}


</style>
