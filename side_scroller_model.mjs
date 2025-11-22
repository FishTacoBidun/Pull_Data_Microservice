// File: side_scroller_model.mjs for database microservice REST API
// Programmers: Kelsey Shanks, Wolfgang Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const SIDE_SCROLLER_DB_NAME = 'side_scroller_db';

let connection = undefined;

async function connectToDatabase() {
    try{
        connection = await mongoose.connect
            (process.env.MONGODB_CONNECT_STRING, {dbName: SIDE_SCROLLER_DB_NAME});
        console.log("Successfully connected to MongoDB - Side Scroller using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Side Scroller ${err.message}`)
    }
}

// Side-Scroller Web App - Schema and Model:
const sideScrollerSchema = mongoose.Schema({
    levelId: {type: Number, required: true, unique: true},
    unlocked: {type: Boolean, required: true, default: false}
})

const Side_Scroller_Data = mongoose.model(SIDE_SCROLLER_DB_NAME, sideScrollerSchema);

/**
* Creates new side_scroller_data object in database
* @param {number} levelId
* @param {boolean} unlocked
* @returns {object} side_scroller_data
*/
const createSideScrollerData = async(
    levelId, 
    unlocked
) => { 
    const side_scroller_data = new Side_Scroller_Data({
        levelId: levelId, 
        unlocked: unlocked
    });
    return side_scroller_data.save();
}

/**
* Pulls all side_scroller_data objects in database as array
* @returns {array}
*/
const getSideScrollerData = async() => {
    const query = Side_Scroller_Data.find();
    return query.exec();
}

/**
* Pulls side_scroller_data object with matching levelId
* @param {number} levelId
* @returns {object}
*/
const getSideScrollerDataByLevelId = async(levelId) => {
    const query = Side_Scroller_Data.findOne({levelId: levelId});
    return query.exec();
}

/**
* Pulls side_scroller_data object with matching ID from database
* @param {string} id
* @returns {object}
*/
const getSideScrollerDataById = async(id) => {
    const query = Side_Scroller_Data.findById(id);
    return query.exec();
}

/**
* Updates side_scroller_data object in database with new data
* @param {string} id
* @param {object} update
* @returns {object}
*/
const updateSideScrollerData = async(id, update) => {
    await Side_Scroller_Data.updateOne({_id: id}, update).exec();
    const updatedSideScrollerData = getSideScrollerDataById(id);
    return updatedSideScrollerData;
}

/**
* Deletes side_scroller_data object from database
* @param {string} id
*/
const deleteSideScrollerDataById = async(id) => {
    await Side_Scroller_Data.deleteOne({_id: id});
    return
}

export { connectToDatabase, createSideScrollerData, getSideScrollerData, 
    getSideScrollerDataByLevelId, getSideScrollerDataById, updateSideScrollerData, 
    deleteSideScrollerDataById
};
