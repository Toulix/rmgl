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
    validatePassword(value) {
      if (!value) {
        return "Mot de passe requis";
      }
      return true;
    },
  },
};
</script>

<template>
  <NavBar />
  <div class="grid h-screen place-items-center">
    <div class="w-full max-w-md">
      <Form
        @submit="onSubmit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="md:flex md:items-center mb-6 mt-2">
          <div class="md:w-1/3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              rules="required|minLength:4"
              type="text"
              placeholder="Username"
              autocomplete="false"
            />
            <ErrorMessage class="text-red-500 text-xs" name="username" />
          </div>
        </div>

        <div class="md:flex md:items-center mb-6 mt-2">
          <div class="md:w-1/3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              rules="required|email"
              type="text"
              placeholder="email"
              autocomplete="false"
            />
            <ErrorMessage class="text-red-500 text-xs" name="email" />
          </div>
        </div>

        <div class="md:flex md:items-center mb-6 mt-2">
          <div class="md:w-1/3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              rules="required|minLength:6"
              placeholder="*********"
              autocomplete="false"
            />
            <ErrorMessage class="text-red-500 text-xs" name="password" />
          </div>
        </div>
        <hr />

        <div class="md:flex md:items-center mb-6 mt-2">
          <div class="md:w-1/3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Warrior
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="warriorName"
              name="warriorName"
              type="text"
              rules="required|minLength:6"
              placeholder="Ex: Sven"
              autocomplete="false"
            />
            <ErrorMessage class="text-red-500 text-xs" name="warriorName" />
          </div>
        </div>

        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="hp">
              HP
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hp"
              name="hp"
              value="100"
              disabled
              type="number"
              placeholder="100"
              autocomplete="false"
            />
          </div>
        </div>

        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="mp">
              MP
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mp"
              name="mp"
              rules="required|numeric|between:30,100"
              type="text"
              placeholder="mp"
              autocomplete="false"
            />
            <ErrorMessage class="text-red-500 text-xs" name="mp" />
          </div>
        </div>

        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              ST
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="st"
              name="st"
              rules="required|numeric|between:40,100"
              type="text"
              placeholder="st"
              autocomplete="false"
            />
            <ErrorMessage class="text-red-500 text-xs" name="st" />
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create my account
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
