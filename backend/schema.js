const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL's schema language
// createWarrior(name: String!, hp: Int!, mp: Int!, st: Int!, type: String!, creator: User!): Warrior!

module.exports = gql`
    type Warrior {
        id: ID!
        name: String!
        hp: Int!
        mp: Int!
        st: Int!
        type: String!
        creator: User!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        warriors: [Warrior!]!
    }

    type Query {
        warriors: [Warrior!]!
        getWarrior(id: ID!): Warrior!
    }

    type Mutation {
        hitGauloisWarrior(idRoumain: ID!, idGaulois: ID!): Warrior!
        hitRomainWarrior(idGaulois: ID!, idRoumain: ID!): Warrior!
        curseGauloisWarrior(idRoumain: ID!, idGaulois: ID!): Warrior!
        curseRomainWarrior(idGaulois: ID!, idRoumain: ID!): Warrior!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(email: String!, password: String!): String!
    }
`;