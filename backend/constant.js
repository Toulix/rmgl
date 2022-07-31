const { PubSub } = require('graphql-subscriptions');

 const pubsub = new PubSub();

 const WARRIOR_HITTED = "WARRIOR_HITTED"

 module.exports = {
    pubsub,
    WARRIOR_HITTED
 }