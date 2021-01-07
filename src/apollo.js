import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://cksrlcks.cafe24.com/wp/graphql"
})

export default client;