const Query = require('./query');
const Mutation = require('./mutation');
const Types = require('./type');
const Subscription = require('./subscription');

module.exports = {
    Query,
    Mutation,
    Subscription,
    ...Types
};