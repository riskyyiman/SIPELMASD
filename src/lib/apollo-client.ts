// src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Buat link ke endpoint GraphQL kamu
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql', // Ganti sesuai URL backend
});

// Tambahkan auth token ke setiap permintaan
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Buat Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),

  // Optional: untuk debug di DevTools
  connectToDevTools: true,
});

export default client;
