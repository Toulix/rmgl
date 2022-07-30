module.exports = {
        // createWarrior: async (parent, args, { models }) => {

        // const { name, hp, mp, st, type, creator } = args;

        // return await models.Warrior
        //                    .create({
        //                         name,
        //                         hp,
        //                         mp,
        //                         st,
        //                         type,
        //                         creator                                      
        //                     });
        // },

//      * Roumain
//              * Frapper (button)
//                      * Action: HP (Gaulois) = HP (Gaulois) - ST (Romain)

        hitGauloisWarrior: async (parent, {idRoumain, idGaulois }, { models }) => {
        
           const roumain =  await models.Warrior.find({ _id: idRoumain, type: 'Roumain' });
                
           if(roumain) {
                return await models.Warrior.findOneAndUpdate(
                        {
                          _id: idGaulois,
                        },
                        {
                         $set: {
                           hp: hp - roumain.st
                          }
                        },
                        {
                         new: true
                        });
           }
        },

//      * Roumain
//              * Lancer sort (button)
//                      * Action: HP (Gaulois) = HP (Gaulois) - MP (Romain)

        curseGauloisWarrior: async (parent, {idRoumain, idGaulois }, { models }) => {
        
        const roumain =  await models.Warrior.find({ _id: idRoumain, type: 'Roumain' });
             
        if(roumain) {
             return await models.Warrior.findOneAndUpdate(
                     {
                       _id: idGaulois,
                     },
                     {
                      $set: {
                        hp: hp - roumain.mp
                       }
                     },
                     {
                      new: true
                     });
        }
     },

//      Gaulois:
//      * Frapper (button)
//              * Action: HP (Romain) = HP (Romain) - ST (Gaulois)

       hitRomainWarrior:  async (parent, {idGaulois, idRomain }, { models }) => {
        
        const gaulois =  await models.Warrior.find({ _id: idGaulois, type: 'Gaulois' });
             
        if(gaulois) {
             return await models.Warrior.findOneAndUpdate(
                     {
                       _id: idRomain,
                     },
                     {
                      $set: {
                        hp: hp - gaulois.st
                       }
                     },
                     {
                      new: true
                     });
        }
     },

//      Gaulois:
//      * Lancer sort (button)
//              * Action: HP (Romain) = HP (Romain) - MP (Gaulois)

        curseRomainWarrior: async (parent, {idGaulois, idRomain }, { models }) => {
        
                const gaulois =  await models.Warrior.find({ _id: idGaulois, type: 'Gaulois' });
                
                if(gaulois) {
                return await models.Warrior.findOneAndUpdate(
                        {
                          _id: idRomain,
                        },
                        {
                        $set: {
                          hp: hp - gaulois.mp
                        }
                        },
                        {
                          new: true
                        });
        }
     },
}
