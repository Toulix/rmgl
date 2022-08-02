# Développeur full stack js

The purpose of this test is to test the candidate's skills in full stack javascript web development.

## Topic

Create a real-time application that records combat data between a Roman and a Gaul respecting the following indications

### Indications

a) Being able to connect with two different users

b) Being able to create fighters (Gauls, Romans...) with these data to save (each user can create fighters):

- `Nom`
- `HP` ( initial value = 100)
- `MP` ( initial value = 30 // editable and max value = 100)
- `ST` (initial value = 40 // editable and max value = 100)

c) Being able to choose a fighter for each user

d) create a page with 2 buttons depending on the type of the fighters:

if the fighter is of type Gauls:

- Hit (button)
  - Action: HP (Romans) = HP (Romans) - ST (Gauls)
- Curse (button)
  - Action: HP (Romans) = HP (Romans) - MP (Gauls)

if the fighter is of type Romans:

- Hit (button)
  - Action: HP (Gauls) = HP (Gauls) - ST (Romans)
- Curse (button)
  - Action: HP (Gauls) = HP (Gauls) - MP (Romans)

c) During the fight if HP is < 0, display the winners.

> **Note:** filling out forms can be done in a separate page
> the API should use the **GraphQL** query language with **Node.js** coupled with **VueJS**
> The fight should be in real time

## Spec technique

- Bdd: `Mysql`, or `MongoDB`;
- API Back-end: `GrahQL`, `Node.js`;
- API Front-end: `VueJS`;
- language: `javascript`;
- Project repository: `Gitlab`;
- Dockeriser l'application
