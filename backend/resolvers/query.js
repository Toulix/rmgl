module.exports = {

    warriors: async (parent, args, { models }) => {
        return await models.Warrior
                            .find()
                            .populate('creator')
                        },
    getWarrior: async (parent,args, { models }) => { 
        return await models.Warrior
                            .findById(args.id)
                            .populate('creator')
                        }
}