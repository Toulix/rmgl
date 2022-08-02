<script>
import NavBar from "@/components/NavBar.vue";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
};
</script>

<template>
  <NavBar />
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="email"
          autocomplete="false"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Mot de passe
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="***********"
          autocomplete="false"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Se connecter
        </button>
      </div>
    </form>
  </div>
</template>
