const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
        AuthenticationError,
        ForbiddenError
        } = require('apollo-server-express');

const { pubsub, WARRIOR_HITTED } = require('../constant');

const jwt_secret = process.env.JWT_SECRET || 'warrior';

module.exports = {

      // hitWarrior(idWarrior: ID!): Warrior!

      hitWarrior: async (parent, {idWarrior}, { models, user }) => {

        if(!user)
           throw new AuthenticationError('You must be signed in to perform this operation');

        const fetchedUser = await models.User.findOne({_id: user.id})
                                             .populate('warrior');
        
        if (!fetchedUser) {
                 throw new Error('User not found');
            }
                                       
        const myWarrior = await models.Warrior.findOne({ creator: user.id});

          if (!myWarrior) {
               throw new Error('Warrior not found for the current user');
          }

         let hittedWarrior = await models.Warrior.findOne({ _id: idWarrior});
          
         if (!hittedWarrior) {
            throw new Error('Hitted warrior not found');
          }

         if(myWarrior.type == hittedWarrior.type)
              throw new Error('Cannot hit warrior of the same type');
          
         if(hittedWarrior.hp == 0)
              throw new Error('Cannot hit dead warrior');

        const diffHp = hittedWarrior.hp - myWarrior.st;
        const finalHp = diffHp < 0 ? 0 : diffHp;

        const updatedHitWarrior =  await models.Warrior.findOneAndUpdate(
                                                {
                                                  _id: hittedWarrior.id,
                                                },
                                                {
                                                  $set: {
                                                    hp: finalHp
                                                    }
                                                },
                                                {
                                                  new: true
                                                });

          pubsub.publish(WARRIOR_HITTED, {
            warriorHitted: updatedHitWarrior
          })
          
          return updatedHitWarrior;
      
      },

      curseWarrior: async (parent, { idWarrior }, { models, user }) => {

        if(!user)
           throw new AuthenticationError('You must be signed in to perform this operation');

        const fetchedUser = await models.User.findOne({_id: user.id})
                                             .populate('warrior');
        
        if (!fetchedUser) {
                 throw new Error('User not found');
            }
                                       
        const myWarrior = await models.Warrior.findOne({ creator: user.id});

          if (!myWarrior) {
               throw new Error('Warrior not found for the current user');
          }

         let cursedWarrior = await models.Warrior.findOne({ _id: idWarrior});
    
         if (!cursedWarrior) {
            throw new Error('Cursed warrior not found');
          }

         if(myWarrior.type == cursedWarrior.type)
              throw new Error('Cannot curse warrior of the same type');
          
         if(cursedWarrior.hp == 0)
              throw new Error('Cannot curse dead warrior');

        const diffHp = cursedWarrior.hp - myWarrior.mp;

        const finalHp = diffHp < 0 ? 0 : diffHp;

        const updatedHitWarrior = await models.Warrior.findOneAndUpdate(
                {
                  _id: cursedWarrior.id,
                },
                {
                 $set: {
                   hp: finalHp
                  }
                },
                {
                 new: true
                });


          pubsub.publish(WARRIOR_HITTED, {
            warriorHitted: updatedHitWarrior
          })
          
          return updatedHitWarrior;
      
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
