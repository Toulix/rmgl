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
        warrior: Warrior
    }

    type Query {
        warriors: [Warrior!]!
        getWarrior(id: ID!): Warrior!
        user(username: String!): User
        users: [User!]!
        me: User!
    }

    type Subscription {
        warriorHitted: Warrior!
    }

    type Mutation {
        hitWarrior(idWarrior: ID!): Warrior!
        curseWarrior(idWarrior: ID!): Warrior!
        signUp(username: String!,
               email: String!,
               password: String!,
               warriorName: String!,
               warriorHp: Int!,
               warriorMp: Int!,
               warriorSt: Int!,
               warriorType: String!,
               ): String!

        signIn(email: String!, password: String!): String!
    }
`;
