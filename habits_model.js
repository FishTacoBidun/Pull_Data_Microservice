//File: model.mjs containing the models for the individual databases and database operations for our database_microservice REST API
//Programmer Name: Kelsey Shanks, Wolfie Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const HABITS_DB_NAME = 'habits_db';

let connection = undefined;

//ADD conditional to check which custom HTTP header was sent from the calling program to select DB
//This function connects to the MongoDB server and to the database
//'exercise_db' in that server.

async function connect() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HABITS_DB_NAME});
        console.log("Successfully connected to MongoDB - Habits using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Habits ${err.message}`)
    }
}

//SCHEMA
//Side-Scroller Web App
const habitsSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    info: {type:String, required: true},
    image: {type: String, required: true}
})

//Compile model from schema after defining
const Habits_Data = mongoose.model(HABITS_DB_NAME, habitsSchema);

//CREATE
/**
* Creates new Habits_Data object in database        
* @param {string} name
* @param {string} date
* @param {string} info
* @param {string} image
* @returns {object} habits_data
*/
const createHabitsData = async(name, date, info, image) => { 
    const habits_data = new Habits_Data({name: name, date: date, info: info, image: image});
    return habits_data.save();
}

// GET
/**
* Pulls all Habits_Data objects in database as array
* @returns {array}
*/
const getHabitsData = async() => {
    const query = Habits_Data.find();
    return query.exec();
}

/**
* Pulls Habits_Data object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getHabitsDataById = async(id) => {
    const query = Habits_Data.findById(id);
    return query.exec();
}

//UPDATE
/**
* Updates Habits_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object} updated_habits_data
*/
const updateHabitsData = async(id, update) => {
    await Habits_Data.updateOne({_id: id}, update).exec();
    const updated_habits_data = getHabitsDataById(id);
    return updated_habits_data;
}

//DELETE 
/**
* Deletes Habits_Data object from database
* @param {string} id
*/
const deleteHabitsDataById = async(id) => {
    await Habits_Data.deleteOne({_id: id});
    return
}


//Export all functions
export { connect, createHabitsData, getHabitsData, 
    getHabitsDataById, updateHabitsData, deleteHabitsDataById, 
};