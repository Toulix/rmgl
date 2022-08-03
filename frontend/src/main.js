import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import Vuelidate from "vuelidate";

import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://laravel-graphql.test/graphql',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp(App);
app.use(Vuelidate);
app.use(router);
app.use(apolloProvider);


app.mount("#app");
