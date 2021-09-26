import { createApp, h, provide } from 'vue'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client/core";
import { ApolloClients } from "@vue/apollo-composable";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from './router';

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return forward(operation);
  }),
  new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
]);

const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});

app.use(ElementPlus);
app.use(router);

app.mount("#app");
