// this file is the dat access layer 

//bring in the db path
const db = require('../data/db-config.js');

module.exports = {
    find,
    findByID,
}

function find(){
   return db.select('*').from('users')
   // return db('users')
}

function findByID(id){
    return db('users')
    .where({id})
    .first()

}