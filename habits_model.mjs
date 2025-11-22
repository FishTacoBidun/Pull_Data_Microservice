// File: habits_model.mjs for database microservice REST API
// Programmers: Kelsey Shanks, Wolfgang Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const HABITS_DB_NAME = 'habits_db';

let connection = undefined;

async function connectToDatabase() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HABITS_DB_NAME});
        console.log("Successfully connected to MongoDB - Habits using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Habits ${err.message}`)
    }
}

// Habit Tracking App Schema and Model: 
const habitsSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    info: {type:String, required: true},
    image: {type: String, required: true}
})

const Habits_Data = mongoose.model(HABITS_DB_NAME, habitsSchema);

/**
* Creates new Habits_Data object in database        
* @param {string} name
* @param {string} date
* @param {string} info
* @param {string} image
* @returns {object} habits_data
*/
const createHabitsData = async(
    name, 
    date, 
    info, 
    image
) => { 
    const habits_data = new Habits_Data({
        name: name, 
        date: date, 
        info: info, 
        image: image
    });
    return habits_data.save();
}

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

/**
* Updates Habits_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object}
*/
const updateHabitsData = async(id, update) => {
    await Habits_Data.updateOne({_id: id}, update).exec();
    const updated_habits_data = getHabitsDataById(id);
    return updated_habits_data;
}

/**
* Deletes Habits_Data object from database
* @param {string} id
*/
const deleteHabitsDataById = async(id) => {
    await Habits_Data.deleteOne({_id: id});
    return
}


// Export all functions
export { connectToDatabase, createHabitsData, getHabitsData, 
    getHabitsDataById, updateHabitsData, deleteHabitsDataById, 
};
