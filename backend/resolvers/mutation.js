const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
        AuthenticationError,
        ForbiddenError
        } = require('apollo-server-express');

const jwt_secret = process.env.JWT_SECRET || 'warrior';

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

     signUp: async (parent, { username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase();
        // hash the password
        const hashed = await bcrypt.hash(password, 10);

        try {
           const user = await models.User.create({
                username,
                email,
                password: hashed
                });
        // create and return the json web token
                return jwt.sign({ id: user._id }, jwt_secret);
        } catch (err) {

        console.log(err);
        // if there's a problem creating the account, throw an error
           throw new Error('Error creating account');
        }
        },
}
