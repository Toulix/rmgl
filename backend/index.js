const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();

const db = require("./db");

const port = process.env.PORT || 4000;

db.connect().then(() => {
    console.log("Connected to MongoDB: " + db.url);
  });  

let warriors = [
 { id: '1', name: 'Merlin Gaulois', hp: 100, mp: 30, st: 40, type: 'Gaulois'  },
 { id: '2', name: 'Jacques Roumain', hp: 100, mp: 30, st: 60, type: 'Roumain'  },
];

// Construct a schema, using GraphQL's schema language
const typeDefs = gql`

    type Warrior {
        id: ID!
        name: String!
        hp: Int!
        mp: Int!
        st: Int!
        type: String!
        creator: String!
    }

    input WarriorInput {
        name: String!
        hp: Int!
        mp: Int!
        st: Int!
        type: String!
        creator: String!
    }

    type Query {
        warriors: [Warrior!]!
        getWarrior(id: ID!): Warrior!
    }

    type Mutation {
        createWarrior(warriorInput: WarriorInput!): Warrior!
    }
`;

// Provide resolver functions for our schema fields
const resolvers = {

    Query: {
        warriors: () => warriors,
        getWarrior: (parent,args) => warriors.find(warrior => warrior.id == args.id)
    },

    Mutation: {
        createWarrior: (parent, args) => {
            let warrior = {
                id: warriors.length + 1,
                name: args.name,
                hp: args.hp,
                mp: args.mp,
                st: args.st,
                type: args.type,
                creator: args.creator
            };

            warriors.push(warrior);

            return warrior;
        }
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