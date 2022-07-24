const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();

const db = require("./db");

const models = require("./models");
const typeDefs = require('./schema');

const port = process.env.PORT || 4000;

db.connect("mongodb://localhost:27017/war")
        .then(() => {
            console.log("Connected to MongoDB...");
        }).catch(error => {
            console.log('An error occured when connecting to mongoDB database', error)
        });  



// Provide resolver functions for our schema fields
const resolvers = {

    Query: {
        warriors: async () => await models.Warrior.find(),
        getWarrior: async (parent,args) => await models.Warrior.findById(args.id)
    },

    Mutation: {
        createWarrior: async (parent, args) => {

        const { name, hp, mp, st, type, creator } = args;

        return await models.Warrior
                           .create({
                                name,
                                hp,
                                mp,
                                st,
                                type,
                                creator                                      
                            });
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