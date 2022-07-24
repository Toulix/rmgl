module.exports = {
    warriors: async (parent, args, { models }) => await models.Warrior.find(),
    getWarrior: async (parent,args, { models }) => await models.Warrior.findById(args.id)
}