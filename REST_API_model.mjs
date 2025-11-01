// This is where we will write the model of the REST API for our database_microservice REST API

/**
* Programmer Name: Kelsey Shanks, Wolfgang
*/
import mongoose from 'mongoose';
import 'dotenv/config';

const CALORIES_DB_NAME = 'calories_db';         // update with name of data base?
const SIDE_SCROLLER_DB_NAME = 'side_scroller_db';
const HIKES_DB_NAME = 'hikes_db';
const HABITS_DB_NAME = 'habits_db';

let connection1 = undefined;
let connection2 = undefined;
let connection3 = undefined;
let connection4 = undefined;

// ADD conditional to check which custom HTTP header was sent from the calling program to select DB
/**
* This function connects to the MongoDB server and to the database
* 'exercise_db' in that server.
*/
async function connectToDatabases() {
    try{
        connection1 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: CALORIES_DB_NAME});
        console.log("Successfully connected to MongoDB - Calories using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Calories ${err.message}`)
    }
    try{
        connection2 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: SIDE_SCROLLER_DB_NAME});
        console.log("Successfully connected to MongoDB - Side Scroller using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Side Scroller ${err.message}`)
    }
    try{
        connection3 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HIKES_DB_NAME});
        console.log("Successfully connected to MongoDB - Hikes using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Hikes ${err.message}`)
    }
    try{
        connection4 = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: HABITS_DB_NAME});
        console.log("Successfully connected to MongoDB - Habits using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Habits ${err.message}`)
    }
}

// Schema - Calorie-Counter App:            // update all schema with keys and typings
const calorieCounterSchema = mongoose.Schema({
    key1: {type: String, required: true},
    key2: {type: Number, required: true},
    key3: {type: String, required: true},
    key4: {type: Number, required: true},
    key5: {type: String, required: true}
})

// Schema - Side Scroller Web App:
const sideScrollerSchema = mongoose.Schema({
    key1: {type: String, required: true},
    key2: {type: Number, required: true},
    key3: {type: String, required: true},
    key4: {type: Number, required: true},
    key5: {type: String, required: true}
})

// Schema - My Hikes Web App:
const myHikesSchema = mongoose.Schema({
    key1: {type: String, required: true},
    key2: {type: Number, required: true},
    key3: {type: String, required: true},
    key4: {type: Number, required: true},
    key5: {type: String, required: true}
})

// Schema - Habit Tracking Web App:
const habitTrackerSchema = mongoose.Schema({
    key1: {type: String, required: true},
    key2: {type: Number, required: true},
    key3: {type: String, required: true},
    key4: {type: Number, required: true},
    key5: {type: String, required: true}
})

// Compile model from schema after defining
const Calorie_Entry = mongoose.model(CALORIES_DB_NAME, calorieCounterSchema);
const Side_Scroller_Data = mongoose.model(SIDE_SCROLLER_DB_NAME, sideScrollerSchema);
const Hikes_Data = mongoose.model(HIKES_DB_NAME, myHikesSchema);
const Habits_Data = mongoose.model(HABITS_DB_NAME, habitTrackerSchema);

//------------------- CREATE FOR EACH SCHEMA--------------------------  // update all creates with keys

/**
* Creates new Calorie_Entry object in database
* @param {string} key1
* @param {number} key2
* @param {string} key3
* @param {number} key4
* @param {string} key5
* @returns {object} calorie_entry
*/
const create_calorie_entry = async(val1, val2, val3, val4, val5) => { 
    const calorie_entry = new Calorie_Entry({key1: val1, key2: val2, key3: val3, key4: val4, key5: val5});
    return calorie_entry.save();
}

/**
* Creates new Side_Scroller_Data object in database
* @param {string} key1
* @param {number} key2
* @param {string} key3
* @param {number} key4
* @param {string} key5
* @returns {object} side_scroller_data
*/
const create_side_scroller_data = async(val1, val2, val3, val4, val5) => { 
    const side_scroller_data = new Side_Scroller_Data({key1: val1, key2: val2, key3: val3, key4: val4, key5: val5});
    return side_scroller_data.save();
}

/**
* Creates new Hikes_Data object in database
* @param {string} key1
* @param {number} key2
* @param {string} key3
* @param {number} key4
* @param {string} key5
* @returns {object} hikes_data
*/
const create_hikes_data = async(val1, val2, val3, val4, val5) => { 
    const hikes_data = new Hikes_Data({key1: val1, key2: val2, key3: val3, key4: val4, key5: val5});
    return hikes_data.save();
}

/**
* Creates new Habits_Data object in database
* @param {string} key1
* @param {number} key2
* @param {string} key3
* @param {number} key4
* @param {string} key5
* @returns {object} habits_data
*/
const create_habits_data = async(val1, val2, val3, val4, val5) => { 
    const habits_data = new Habits_Data({key1: val1, key2: val2, key3: val3, key4: val4, key5: val5});
    return habits_data.save();
}

//------------------- GET FOR EACH SCHEMA (LIST)--------------------------

/**
* Pulls all Calorie_Entry objects in database as array
* @returns {array}
*/
const getCalorieEntries = async() => {
    const query = Calorie_Entry.find();
    return query.exec();
}

/**
* Pulls all Side_Scroller_Data objects in database as array
* @returns {array}
*/
const getSideScrollerData = async() => {
    const query = Side_Scroller_Data.find();
    return query.exec();
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
* Pulls all Habits_Data objects in database as array
* @returns {array}
*/
const getHabitsData = async() => {
    const query = Habits_Data.find();
    return query.exec();
}

//------------------- GET FOR EACH SCHEMA (MATCH)--------------------------

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
* Pulls Side_Scroller_Data object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getSideScrollerDataById = async(id) => {
    const query = Side_Scroller_Data.findById(id);
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
* Pulls Habits_Data object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getHabitsDataById = async(id) => {
    const query = Habits_Data.findById(id);
    return query.exec();
}

//------------------- UPDATE FOR EACH SCHEMA--------------------------

/**
* Updates Calorie_Entry object in database with new data
* @param {string} id
* @param {object} update
* @returns {object} updatedCalorieEntry
*/
const updateCalorieEntry = async(id, update) => {
    await Calorie_Entry.updateOne({_id: id}, update).exec();
    const updatedCalorieEntry = getCalorieEntryById(id);
    return updatedCalorieEntry;
}

/**
* Updates Side_Scroller_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object} updatedSideScrollerData
*/
const updateSideScrollerData = async(id, update) => {
    await Side_Scroller_Data.updateOne({_id: id}, update).exec();
    const updatedSideScrollerData = getSideScrollerDataById(id);
    return updatedSideScrollerData;
}

/**
* Updates Hikes_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object} updatedSideScrollerData
*/
const updateHikesData = async(id, update) => {
    await Hikes_Data.updateOne({_id: id}, update).exec();
    const updatedHikesData = getHikesDataById(id);
    return updatedHikesData;
}

/**
* Updates Habits_Data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object} updatedSideScrollerData
*/
const updateHabitsData = async(id, update) => {
    await Habits_Data.updateOne({_id: id}, update).exec();
    const updatedHabitsData = getHabitsDataById(id);
    return updatedHabitsData;
}

//------------------- DELETE FOR EACH SCHEMA--------------------------

/**
* Deletes Calorie_Entry object from database
* @param {string} id
*/
const deleteCalorieEntryById = async(id) => {
    await Calorie_Entry.deleteOne({_id: id});
    return
}

/**
* Deletes Side_Scroller_Data object from database
* @param {string} id
*/
const deleteSideScrollerDataById = async(id) => {
    await Side_Scroller_Data.deleteOne({_id: id});
    return
}

/**
* Deletes Hikes_Data object from database
* @param {string} id
*/
const deleteHikesDataById = async(id) => {
    await Hikes_Data.deleteOne({_id: id});
    return
}

/**
* Deletes Habits_Data object from database
* @param {string} id
*/
const deleteHabitsDataById = async(id) => {
    await Habits_Data.deleteOne({_id: id});
    return
}

export { connectToDatabases, create_calorie_entry, create_side_scroller_data, create_hikes_data,
    create_habits_data, getCalorieEntries, getSideScrollerData, getHikesData, 
    getHabitsData, getCalorieEntryById, getSideScrollerDataById, getHikesDataById,
    getHabitsDataById, updateCalorieEntry, updateSideScrollerData, updateHikesData,
    updateHabitsData, deleteCalorieEntryById, deleteSideScrollerDataById, 
    deleteHikesDataById, deleteHabitsDataById
};

