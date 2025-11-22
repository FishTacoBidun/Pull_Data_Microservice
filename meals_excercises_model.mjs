// File: meals_exercises_model.mjs for database microservice REST API
// Programmers: Kelsey Shanks, Wolfgang Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const CALORIES_DB_NAME = 'calories_db_selections';

let connection = undefined;

async function connectToDatabase() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: CALORIES_DB_NAME});
        console.log("Successfully connected to MongoDB - Exercises using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Exercises ${err.message}`)
    }
}

// Calorie-Counting App - Meals & Exercises Schema and Model:
const calEntryOptionSchema = mongoose.Schema({
    name: {type: String, required: true},
    calories: {type: Number, required: true},
    image: {type: String, required: true}, 
    ingredients: {type: Array, required: true},
    type: {type: String, required: true},
}, { collection : 'selections'});

const Selection_Entry = mongoose.model(CALORIES_DB_NAME, calEntryOptionSchema);

/**
* Creates new Meal_Entry object in database
* @param {string} name
* @param {number} calories
* @param {string} image
* @param {array} ingredients
* @param {string} type
* @returns {object} calorie_entry
*/
const createSelectionEntry = async(
    name, 
    calories, 
    image, 
    ingredients, 
    type
) => {
    const meal_entry = new Selection_Entry({
        name: name,
        calories: calories,
        image: image,
        ingredients: ingredients,
        type: type
    });
    return meal_entry.save();
}

/**
* Pulls all Meal_Entry objects in database as array
* @returns {array}
*/
const getSelections = async() => {
    const query = Selection_Entry.find();
    return query.exec();
}

/**
* Pulls Meal_Entry object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getSelectionById = async(id) => {
    const query = Selection_Entry.findById(id);
    return query.exec();
}

/**
* Updates Meal_Entry object in database with new data
* @param {string} id
* @param {object} update
* @returns {object}
*/
const updateSelection = async(id, update) => {
    await Selection_Entry.updateOne({_id: id}, update).exec();
    const updatedMealEntry = getSelectionById(id);
    return updatedMealEntry;
}

/**
* Deletes Meal_Entry object from database
* @param {string} id
*/
const deleteSelectionById = async(id) => {
    await Selection_Entry.deleteOne({_id: id});
    return
}

// Export all functions
export { connectToDatabase, createSelectionEntry, getSelections, getSelectionById, 
    updateSelection, deleteSelectionById };
