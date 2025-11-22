// Description: Calorie-Counting App model.mjs for Selection_Entry objects
//              for the database microservice REST API.
// Programmers: Kelsey Shanks, Wolfgang Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const SELECTIONS_DB_NAME = 'calories_db_selections';         

let connection = undefined;

async function connectToDatabase() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: SELECTIONS_DB_NAME});
        console.log("Successfully connected to MongoDB - Selections using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Selections ${err.message}`)
    }
}

// Calorie-Counting App - Meals & Exercises Schema and Model:
const selectionsSchema = mongoose.Schema({
    name: {type: String, required: true},
    calories: {type: Number, required: true},
    image: {type: String, required: true},            
    ingredients: {type: Array, required: true},
    type: {type: String, required: true},
});

const Selection_Entry = mongoose.model(SELECTIONS_DB_NAME, selectionsSchema);

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
const getSelectionsByType = async(type) => {
    const query = Selection_Entry.find( { type: type });
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
* @returns {object} updatedMealEntry
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

export { connectToDatabase, createSelectionEntry, getSelectionById, 
    getSelectionsByType, updateSelection, deleteSelectionById };
