const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();

const db = require("./db");

const models = require("./models");

const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;

db.connect("mongodb://localhost:27017/war")
        .then(() => {
            console.log("Connected to MongoDB...");
        }).catch(error => {
            console.log('An error occured when connecting to mongoDB database', error)
        });  

async function startApolloServer(typeDefs, resolvers){
    
    // Apollo Server setup
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
    // Add the db models to the context
            return { models };
            }
    })

    await server.start();

    // Apply the Apollo GraphQL middleware and set the path to /graphql
    server.applyMiddleware({app, path: '/graphql'});
    
    app.listen({port}, () => {
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);