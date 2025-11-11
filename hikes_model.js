//File: model.mjs containing the models for the individual databases and database operations for our database_microservice REST API
//Programmer Name: Kelsey Shanks, Wolfie Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const HIKES_DB_NAME = 'hikes_db';

let connection = undefined;

//ADD conditional to check which custom HTTP header was sent from the calling program to select DB
//This function connects to the MongoDB server and to the database
//'exercise_db' in that server.

async function connect() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HIKES_DB_NAME});
        console.log("Successfully connected to MongoDB - Hikes using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Hikes ${err.message}`)
    }
}

//SCHEMA
//Side-Scroller Web App
const hikesSchema = mongoose.Schema({
    location: {type: String, required: true},
    date: {type: String, required: true},
    notes: {type: String, required: true},
    images: {type: String, required: true}
})

//Compile model from schema after defining
const Hikes_Data = mongoose.model(HIKES_DB_NAME, hikesSchema);

//CREATE
/**
* Creates new Hikes_Data object in database        
* @param {string} name
* @param {string} location
* @param {number} distance
* @param {number} elevation_gain
* @param {number} time_to_complete
* @param {string} date
* @param {string} status (planned or completed)
* @returns {object} hikes_data
*/
const createHikesData = async(name, location, distance, elevation_gain, time_to_complete, date, status) => { 
    const hikes_data = new Habits_Data({
        name: name,
        location: location, 
        distance: distance, 
        elevation_gain: elevation_gain,
        time_to_complete: time_to_complete,
        date: date,
        status: status
    });
    return hikes_data.save();
}

// GET
/**
* Pulls all Hikes_Data objects in database as array
* @returns {array}
*/
const getHikesData = async() => {
    const query = Hikes_Data.find();
    return query.exec();
}

/**
* Pulls Hikes_Data object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getHikesDataById = async(id) => {
    const query = Hikes_Data.findById(id);
    return query.exec();
}

//UPDATE
/**
* Updates Habits_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object} updated_habits_data
*/
const updateHikesData = async(id, update) => {
    await Hikes_Data.updateOne({_id: id}, update).exec();
    const updated_hikes_data = getHikesDataById(id);
    return updated_hikes_data;
}

//DELETE 
/**
* Deletes Hikes_Data object from database
* @param {string} id
*/
const deleteHikesDataById = async(id) => {
    await Hikes_Data.deleteOne({_id: id});
    return
}


//Export all functions
export { connect, createHikesData, getHikesData, 
    getHikesDataById, updateHikesData, deleteHikesDataById, 
};