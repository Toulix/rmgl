const Query = require('./query');
const Mutation = require('./mutation');
const Types = require('./type');

module.exports = {
    Query,
    Mutation,
    ...Types
};