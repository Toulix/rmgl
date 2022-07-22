const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 4000;

let warriors = [
 { id: '1', name: 'Merlin Gaulois', hp: 100, mp: 30, st: 40  },
 { id: '1', name: 'Jacques Roumain', hp: 100, mp: 30, st: 60  },
];

// Construct a schema, using GraphQL's schema language
const typeDefs = gql`
    type Warrior {
        id: ID!
        name: String!
        hp: Int!
        mp: Int!
        st: Int!
    }

    type Query {
        warriors: [Warrior!]!
    }
`;

// Provide resolver functions for our schema fields
const resolvers = {
    Query: {
        warriors: () => warriors
    }
};

async function startApolloServer(typeDefs, resolvers){
    
    // Apollo Server setup
    const server = new ApolloServer({typeDefs, resolvers})

    await server.start();

    // Apply the Apollo GraphQL middleware and set the path to /graphql
    server.applyMiddleware({app, path: '/graphql'});
    
    app.listen({port}, () => {
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);