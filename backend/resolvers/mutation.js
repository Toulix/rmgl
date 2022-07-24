module.exports = {
        createWarrior: async (parent, args, { models }) => {

        const { name, hp, mp, st, type, creator } = args;

        return await models.Warrior
                           .create({
                                name,
                                hp,
                                mp,
                                st,
                                type,
                                creator                                      
                            });
        }
}