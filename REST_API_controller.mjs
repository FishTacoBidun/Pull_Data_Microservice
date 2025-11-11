// File: controller.mjs for database microservice REST API
/**
* Programmers: Kelsey Shanks, Wolfgang
*/

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as calories from './calorie_entries_model.mjs';
import * as selections from './meals_exercises_mode.mjs;
import * as side_scroller from './side_scroller_model.mjs;
import * as habits from './habits_model.mjs;
import * as hikes from './hikes_model.mjs;

/*
import createCalorieEntry from './REST_API_model.mjs';     // we may need to individually import these, but maybe not...I'm not sure right now.
import create_side_scroller_data from './REST_API_model.mjs'; 
import create_hikes_data from'./REST_API_model.mjs'; 
import create_habits_data from'./REST_API_model.mjs'; 
import getCalorieEntries from'./REST_API_model.mjs'; 
import getSideScrollerData from'./REST_API_model.mjs'; 
import getHikesData from'./REST_API_model.mjs'; 
import getHabitsData from'./REST_API_model.mjs'; 
import getCalorieEntryById from'./REST_API_model.mjs'; 
import getSideScrollerDataById from'./REST_API_model.mjs'; 
import getHikesDataById from'./REST_API_model.mjs'; 
import getHabitsDataById from'./REST_API_model.mjs'; 
import updateCalorieEntry from'./REST_API_model.mjs'; 
import updateSideScrollerData from'./REST_API_model.mjs'; 
import updateHikesData from'./REST_API_model.mjs'; 
import updateHabitsData from'./REST_API_model.mjs'; 
import deleteCalorieEntryById from'./REST_API_model.mjs'; 
import deleteSideScrollerDataById from'./REST_API_model.mjs'; 
import deleteHikesDataById from'./REST_API_model.mjs'; 
import deleteHabitsDataById from'./REST_API_model.mjs'; 
*/

const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVALID_REQ = {Error: "Invalid request"};
const PORT = process.env.PORT;                              // NEED TO WRITE A .env!!!!
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

// --------------------------------------------- CREATE OPERATIONS ----------------------------------------------------

app.post('/calories', asyncHandler (async (req, res) => {       // -------- ENDPOINT #1: Create new data - Calories --------
    // Check validity:
        
    // Continue if valid:
        const result = await calories.createCalorieEntry(
            req.body.date,                                         
            req.body.duration,
            req.body.type,
            req.body.calories,
            req.body.name,
            req.body.image);
        res.status(201).json(result);                              
    }));

app.post('/selections', asyncHandler (async (req, res) => {       // --------ENDPOINT #1: Create new data - Selections --------
    // Check validity:
        
    // Continue if valid:
        const result = await selection.createSelectionEntry(
            req.body.name,                                         
            req.body.calories,
            req.body.image,
            req.body.ingredients,
            req.body.type);
        res.status(201).json(result);                              
    }));

app.post('/side_scroller', asyncHandler (async (req, res) => {       // --------ENDPOINT #1: Create new data - Side-Scroller Info --------
    // Check validity:
        
    // Continue if valid:
        const result = await side_scroller.create_side_scroller_data(
            req.body.levelId,                                          
            req.body.unlocked);
        res.status(201).json(result);                               
    }));                         

app.post('/habits', asyncHandler (async (req, res) => {       // --------ENDPOINT #1: Create new data - Habits --------
    // Check validity:
        
    // Continue if valid:
        const result = await habits.createHabitsData(
            req.body.name,                                         
            req.body.date,
            req.body.info,
            req.body.image);
        res.status(201).json(result);                               
    }));

app.post('/hikes', asyncHandler (async (req, res) => {       // --------ENDPOINT #1: Create new data - Hikes --------
    // Check validity:
        
    // Continue if valid:
        const result = await hikes.createEntry(
            req.body.name,                                         
            req.body.location,
            req.body.distance,
            req.body.elevtaion_gain,
            req.body.time_to_complete,
            req.body.date,
            req.body.status);
        res.status(201).json(result);                               
    }));

//-------------------------------------------------------------------------------------------------------------------------------------------

app.get('/data_entires', asyncHandler (async (req, res) => {        // --------ENDPOINT #2: Pull data--------
    const data = await data_entries.functionName();                 // replace functionName w/ function info, get array of data
    res.status(200).json(exerciseOptions);                          // successful result response
    }));

app.get('/data_entires/:id', asyncHandler (async (req, res) => {    // --------ENDPOINT #3: Pull specific data---------
    let data = await data_entries.getDataById(req.params.id);
    if (data === null){
        res.status(404).json(ERROR_NOT_FOUND);                      // if no match
    } else {
        res.status(200).json(data);                                 // if match
    }}));

app.put('/data_entries/:id', asyncHandler (async (req, res) => {    // --------ENDPOINT #4: Update data---------
    // Check validity:

    // Continue if valid:
    let eProperties = Object.keys(oldData);
    for (let i=0; i < eProperties.length; i++){
        if(Object.hasOwnProperty(eProperties[0]) !== Object.hasOwnProperty(req.body)){
        res.status(400).json(ERROR_INVALID_REQ);                    // if missing property
    }
    }
    let updatedData = await data_entires.updateData(req.params.id, req.body); // refers to function from main asking to update data
    res.status(200).json(updatedData);                              // if succesful result
}));

app.delete('/data_entries/:id', asyncHandler (async (req, res) => {    // --------ENDPOINT #5: Delete data---------
    let toRemove = await data_entries.getDataById(req.params.id);
        if (toRemove === null){
        res.status(404).json(ERROR_NOT_FOUND);                      // if no match
    } else {
        await data_entries.deleteById(req.params.id);               // if match
        res.status(204).end();
}}));
