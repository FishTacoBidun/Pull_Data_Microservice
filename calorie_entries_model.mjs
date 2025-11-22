// File: calorie_entires_model.mjs for database microservice REST API
// Programmers: Kelsey Shanks, Wolfgang Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const CALORIES_DB_NAME = 'calories_db';

let connection = undefined;

async function connectToDatabase() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: CALORIES_DB_NAME});
        console.log("Successfully connected to MongoDB - Calories using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Calories ${err.message}`)
    }
}

// Calorie-Counting App - Calorie Entries Schema and Model:
const calorieCounterSchema = mongoose.Schema({
    date: {type: String, required: true},
    duration: {type: Number, required: true},
    type: {type: String, required: true},
    calories: {type: Number, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true}
}, { collection : 'calorie_entries' });

const Calorie_Entry = mongoose.model(CALORIES_DB_NAME, calorieCounterSchema);

/**
* Creates new Calorie_Entry object in database
* @param {string} meal_id
* @param {date} date
* @param {number} duration
* @param {string} type
* @param {number} calories
* @param {string} name
* @param {string} image
* @returns {object} calorie_entry
*/
const createCalorieEntry = async(
    date, 
    duration, 
    type, 
    calories, 
    name, 
    image
) => { 
    const calorie_entry_in = new Calorie_Entry({
        date: date,
        duration: duration, 
        type: type,
        calories: calories,
        name: name,
        image: image
    });
    return calorie_entry_in.save();
}

/**
* Pulls all Calorie_Entry objects in database as array
* @returns {array}
*/
const getCalorieEntries = async() => {
    const query = Calorie_Entry.find();
    return query.exec();
}

/**
* Pulls Calorie_Entry object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getCalorieEntryById = async(id) => {
    const query = Calorie_Entry.findById(id);
    return query.exec();
}

/**
* Pulls Calorie_Entry object with matching date from database
* @param {string} date
* @returns {object}
*/
const getCalorieEntryByDate = async(date) => {
    const query = Calorie_Entry.filter(entry => (entry.date).includes(date));
    return query.exec();
}

/**
* Updates Calorie_Entry object in database with new data
* @param {string} id
* @param {object} update
* @returns {object}
*/
const updateCalorieEntry = async(id, update) => {
    await Calorie_Entry.updateOne({_id: id}, update).exec();
    const updatedCalorieEntry = getCalorieEntryById(id);
    return updatedCalorieEntry;
}

/**
* Deletes Calorie_Entry object from database
* @param {string} id
*/
const deleteCalorieEntryById = async(id) => {
    await Calorie_Entry.deleteOne({_id: id});
    return
}

export { connectToDatabase, createCalorieEntry, getCalorieEntries, getCalorieEntryById, 
    getCalorieEntryByDate, updateCalorieEntry, deleteCalorieEntryById};
