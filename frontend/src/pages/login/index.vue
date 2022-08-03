<script>
import NavBar from "@/components/NavBar.vue";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    NavBar,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submitted", values);
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "This field is required";
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }
      // All is good
      return true;
    },
    validatePassword(value) {
      if (!value) {
        return "Password field is required";
      }
    },
  },
};
</script>

</script>
<template>
  <NavBar />
  <div class="grid h-screen place-items-center">
    <div class="w-full max-w-xs">
      <Form
        @submit="onSubmit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <Field
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            :rules="validateEmail"
            type="text"
            placeholder="email"
            autocomplete="false"
          />
          <ErrorMessage class="text-red-500 text-xs" name="email" />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Mot de passe
          </label>
          <Field
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            :rules="validatePassword"
            placeholder="***********"
            autocomplete="false"
          />
          <ErrorMessage class="text-red-500 text-xs" name="password" />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Se connecter
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
