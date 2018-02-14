# Lingua

### An Immersive Virtual Reality Language Learning Web App

### Description: 
Lingua is a language learning app built to address the shortcomings of the traditional language learning model. Many of the popular applications in language learning follow a model of prompting the user to simply read and translate. Lingua, however, immerses the user in a three dimensional world to leverage the learning advantage gained by conversing with a native speaker, and keeps the learning interesting by implementing a progressive user experience through a quest-reward based system. 

## Developers:
* Leigh Blechman
* Samuel Chai
* Owen Hagerty

## Information for Developers:
### Setup/Module Installation:
1. Clone the repo
2. `npm install` the dependencies
3. In your terminal, create the Lingua postgres database with `createdb lingua` 
4. `npm run seed` to seed the database
5. `npm run start-dev` to start the server and bundle. (Be patient - webpack takes about 30 seconds to bundle)
6. Head to localhost:5000 on Chrome or Firefox and make sure you have a working microphone. Accept use of your mic if prompted.

## Information for Users:
Either follow the "Information for Developers" steps above to run locally, or simply head to [our heroku app](https://lingua-1710.herokuapp.com "Lingua"). Select your desired learning language and your desired quest, make sure you accept use of your microphone if prompted, and have fun!

