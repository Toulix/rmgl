const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const app = express();

const db = require("./db");

const models = require("./models");

const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;

const jwt_secret = process.env.JWT_SECRET || 'warrior';

// get the user info from a JWT
const getUser = token => {
    if (token) {
        try {
        // return the user information from the token
        return jwt.verify(token, jwt_secret);
    } catch (err) {
    // if there's a problem with the token, throw an error
        throw new Error('Session invalid');
        }
     }
    };

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
        context: ({req}) => {
            
        // get the user token from the headers
        const token = req.headers.authorization;

        // try to retrieve a user with the token
        const user = getUser(token);
        
        // Add the db models to the context
            return { models, user};
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