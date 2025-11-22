// File: hikes_model.mjs for database microservice REST API
// Programmers: Kelsey Shanks, Wolfgang Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const HIKES_DB_NAME = 'hikes_db';

let connection = undefined;

async function connectToDatabase() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HIKES_DB_NAME});
        console.log("Successfully connected to MongoDB - Hikes using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Hikes ${err.message}`)
    }
}

// Hike Tracking App Schema and Model:
const hikesSchema = mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    distance: {type: Number, required: true},
    elevation_gain: {type: Number, required: true},
    time_to_complete: {type: Number, required: true},
    date: {type: String, required: true},
    status: {type: String, required: true}
})

const Hikes_Data = mongoose.model(HIKES_DB_NAME, hikesSchema);

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
const createHikesData = async(
    name, 
    location, 
    distance, 
    elevation_gain, 
    time_to_complete, 
    date, 
    status
) => { 
    const hikes_data = new Hikes_Data({
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

/**
* Updates Habits_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object}
*/
const updateHikesData = async(id, update) => {
    await Hikes_Data.updateOne({_id: id}, update).exec();
    const updated_hikes_data = getHikesDataById(id);
    return updated_hikes_data;
}

/**
* Deletes Hikes_Data object from database
* @param {string} id
*/
const deleteHikesDataById = async(id) => {
    await Hikes_Data.deleteOne({_id: id});
    return
}

export { connectToDatabase, createHikesData, getHikesData, 
    getHikesDataById, updateHikesData, deleteHikesDataById, 
};
