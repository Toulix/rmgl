const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
        AuthenticationError,
        ForbiddenError
        } = require('apollo-server-express');

const jwt_secret = process.env.JWT_SECRET || 'warrior';

module.exports = {

      // hitWarrior(idWarrior: ID!): Warrior!

      hitWarrior: async (parent, args, { models, user }) => {

        if(!user)
           throw new AuthenticationError('You must be signed in to perform this operation');

        const fetchedUser = await models.User.findOne({_id: user.id})
                                             .populate('warrior');
        
        if (!fetchedUser) {
                 throw new Error('User not found');
            }
                                       
        const warrior = await models.Warrior.findOne({ creator: user.id});

        if (!warrior) {
               throw new Error('Warrior not found for the current user');
         }
      
      },
        // createWarrior: async (parent, args, { models, user }) => {

        // // if there is no user on the context, throw an authentication error
        // if (!user) {
        //   throw new AuthenticationError('You must be signed in to create a warrior');
        // }

        // const { name, hp, mp, st, type } = args;

        // return await models.Warrior
        //                    .create({
        //                         name,
        //                         hp,
        //                         mp,
        //                         st,
        //                         type,
        //                         // reference the creator's mongo id
        //                         creator: mongoose.Types.ObjectId(user.id)                                        
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


     signUp: async (parent, args , { models }) => {

        const {username,
               email, 
               password, 
               warriorName, 
               warriorHp,
               warriorMp,
               warriorSt, 
               warriorType }  = args;

  
        // hash the password
        const hashed = await bcrypt.hash(password, 10);

        try {
            const user = await models.User.create({
                                                username,
                                                email: email.trim().toLowerCase(),
                                                password: hashed
                                                });
            
            if(!user) throw new Error('Error creating the user');

            const warrior = await models.Warrior.create({
                                                        name: warriorName,
                                                        hp: warriorHp,
                                                        mp: warriorMp,
                                                        st: warriorSt,
                                                        type: warriorType,
                                                        // reference the creator's mongo id
                                                        creator: mongoose.Types.ObjectId(user.id)                                        
                                                    });
                
        // create and return the json web token
                return jwt.sign({ id: user._id }, jwt_secret);
        } catch (err) {

        console.log(err);
        // if there's a problem creating the account, throw an error
           throw new Error('Error creating account');
        }
        },

        signIn: async (parent, { email, password }, { models }) => {
        
                 if (email) {
                 // normalize email address
                    email = email.trim().toLowerCase();
                  }

                const user = await models.User.findOne({ email });

                // if no user is found, throw an authentication error
                if (!user) {
                   throw new AuthenticationError('Username or password incorrect');
                }

                // if the passwords don't match, throw an authentication error
                const valid = await bcrypt.compare(password, user.password);
                
                if (!valid) {
                   throw new AuthenticationError('Username or password incorrect');
                }

                // create and return the json web token
                    return jwt.sign({ id: user._id }, jwt_secret);
                }
}
