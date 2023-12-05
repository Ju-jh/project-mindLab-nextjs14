import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql `,
  cache: new InMemoryCache(),
});

export default client;
