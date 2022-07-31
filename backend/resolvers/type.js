module.exports = {

    User: {
        warrior: async (user, args, { models }) => {
            const warrior = await models.Warrior
                                        .findOne({ creator: user.id});
            return warrior;
        }
    }
    
}