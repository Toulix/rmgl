const { pubsub, WARRIOR_HITTED } = require('../constant');

module.exports = {

      warriorHitted: {
        subscribe: () => pubsub.asyncIterator([WARRIOR_HITTED]),
      }
    }


    // url => ws://localhost:4001/graphql