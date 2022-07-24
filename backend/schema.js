const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL's schema language
module.exports = gql`
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
        createWarrior(name: String!
                    hp: Int!
                    mp: Int!
                    st: Int!
                    type: String!
                    creator: String!): Warrior!
    }
`;