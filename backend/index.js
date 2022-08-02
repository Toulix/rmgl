const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer }  = require('apollo-server-core');
const { makeExecutableSchema }  = require('@graphql-tools/schema');
const { WebSocketServer }  = require('ws');
const { useServer }  = require('graphql-ws/lib/use/ws');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require("./db");
const models = require("./models");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
const app = express();


const httpServer = createServer(app);


const port = process.env.PORT || 4000;
const wsport = process.env.WS_PORT || 4001;

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

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
  });

const schema = makeExecutableSchema({ typeDefs, resolvers });
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

async function startApolloServer(typeDefs, resolvers){
    
    // Apollo Server setup
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
        context: ({req}) => {
            
        // get the user token from the headers
        const token = req.headers.authorization;

        // try to retrieve a user with the token
        const user = getUser(token);
        
        // Add the db models to the context
            return { models, user};
        },
        
        plugins: [
                // Proper shutdown for the HTTP server.
                ApolloServerPluginDrainHttpServer({ httpServer }),
          
                // Proper shutdown for the WebSocket server.
                {
                  async serverWillStart() {
                    return {
                      async drainServer() {
                        await serverCleanup.dispose();
                      },
                    };
                  },
                },
              ],

    
    });

    await server.start();

    // Apply the Apollo GraphQL middleware and set the path to /graphql
    server.applyMiddleware({app, path: '/graphql'});
    
    app.listen({port}, () => {
        console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`);
    });

    httpServer.listen(wsport, () => {
        console.log(`Subscription Server running at ws://localhost:${wsport}${server.graphqlPath}`);
    });
};

startApolloServer(typeDefs, resolvers);