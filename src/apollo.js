import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "http://cksrlcks.cafe24.com/wp/graphql"
})

export default client;