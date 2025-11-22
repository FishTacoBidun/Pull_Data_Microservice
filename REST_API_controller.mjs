// Description: controller.mjs for database microservice REST API
// Programmers: Kelsey Shanks, Wolfgang Essink

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as calories from './calorie_entries_model.mjs';
import * as selections from './meals_exercises_model.mjs';
import * as side_scroller from './side_scroller_model.mjs';
import * as habits from './habits_model.mjs';
import * as hikes from './hikes_model.mjs';

const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVALID_REQ = {Error: "Invalid request"};
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await calories.connectToDatabase();
    await selections.connectToDatabase();
    await side_scroller.connectToDatabase();
    await habits.connectToDatabase();
    await hikes.connectToDatabase();
    console.log(`Server listening on port ${PORT}...`);
});

// --------------------------------------------- CREATE OPERATIONS ----------------------------------------------------

// -------- ENDPOINT #1: Create new data - Calories --------
app.post('/calories', asyncHandler (async (req, res) => {       
        const result = await calories.createCalorieEntry(
            req.body.date,                                         
            req.body.duration,
            req.body.type,
            req.body.calories,
            req.body.name,
            req.body.image);
        res.status(201).json(result);                              
    }));

// --------ENDPOINT #1: Create new data - Selections --------
app.post('/selections', asyncHandler (async (req, res) => {       
        const result = await selections.createSelectionEntry(
            req.body.name,                                         
            req.body.calories,
            req.body.image,
            req.body.ingredients,
            req.body.type);
        res.status(201).json(result);                              
    }));

// --------ENDPOINT #1: Create new data - Side-Scroller Info --------
app.post('/side_scroller', asyncHandler (async (req, res) => { 
        const result = await side_scroller.createSideScrollerData(
            req.body.levelId,                                          
            req.body.unlocked);
        res.status(201).json(result);                               
    }));                         

// --------ENDPOINT #1: Create new data - Habits --------
app.post('/habits', asyncHandler (async (req, res) => {     
        const result = await habits.createHabitsData(
            req.body.name,                                         
            req.body.date,
            req.body.info,
            req.body.image);
        res.status(201).json(result);                               
    }));

// --------ENDPOINT #1: Create new data - Hikes --------
app.post('/hikes', asyncHandler (async (req, res) => {       
        const result = await hikes.createHikesData(
            req.body.name,                                         
            req.body.location,
            req.body.distance,
            req.body.elevation_gain,
            req.body.time_to_complete,
            req.body.date,
            req.body.status);
        res.status(201).json(result);                               
    }));

//-------------------------------------------- GET OPERATIONS - FULL ARRAY ------------------------------------------------

// --------ENDPOINT #2: Pull all data - Calories --------
app.get('/calories', asyncHandler (async (req, res) => {
    const calories_found = await calories.getCalorieEntries();                 
    res.status(200).json(calories_found);                          
    }));

// --------ENDPOINT #2: Pull all data - Selections --------
app.get('/selections', asyncHandler (async (req, res) => {        
    const options_found = await selections.getSelections();                 
    res.status(200).json(options_found);                          
    }));

// --------ENDPOINT #2: Pull all data - Side Scroller --------
app.get('/side_scroller', asyncHandler (async (req, res) => {        
    const side_scroller_data = await side_scroller.getSideScrollerData();                
    res.status(200).json(side_scroller_data);                         
    }));

// --------ENDPOINT #2: Pull all data - Habits --------
app.get('/habits', asyncHandler (async (req, res) => {        
    const habits_found = await habits.getHabitsData();                
    res.status(200).json(habits_found);                          
    }));

// --------ENDPOINT #2: Pull all data - Hikes --------
app.get('/hikes', asyncHandler (async (req, res) => {        
    const hikes_found = await hikes.getHikesData();                
    res.status(200).json(hikes_found);                         
    }));

//-------------------------------------------- GET OPERATIONS - By ID ------------------------------------------------

// ------ ENDPOINT #3: Pull data by ID - Calories -------
app.get('/calories/:id', asyncHandler (async (req, res) => {    
    let entry = await calories.getCalorieEntryById(req.params.id);
    if (entry === null){
        res.status(404).json(ERROR_NOT_FOUND);                   
    } else {
        res.status(200).json(entry);                              
    }}));

// ------ ENDPOINT #3: Pull data by ID - Selection -------
app.get('/selections/:id', asyncHandler (async (req, res) => {    
    let option = await selections.getSelectionById(req.params.id);
    if (option === null){
        res.status(404).json(ERROR_NOT_FOUND);                        
    } else {
        res.status(200).json(option);                                
    }}));

// ------ ENDPOINT #3.1: Pull data by ID - Side Scroller -------
app.get('/side-scroller/:id', asyncHandler (async (req, res) => {    
    let data = await side_scroller.getSideScrollerDataById(req.params.id);
    if (data === null){
        res.status(404).json(ERROR_NOT_FOUND);                    
    } else {
        res.status(200).json(data);                              
    }}));

// ------ ENDPOINT #3.2: Pull data by levelId - Side Scroller -------
app.get('/side-scroller/:levelId', asyncHandler (async (req, res) => {    
    let data = await side_scroller.getSideScrollerDataByLevelId(req.params.levelId);
    if (data === null){
        res.status(404).json(ERROR_NOT_FOUND);                    
    } else {
        res.status(200).json(data);                                
    }}));

// ------ ENDPOINT #3: Pull data by ID - Habits -------
app.get('/habits/:id', asyncHandler (async (req, res) => {    
    let habit_entry = await habits.getHabitsDataById(req.params.id);
    if (habit_entry === null){
        res.status(404).json(ERROR_NOT_FOUND);                          
    } else {
        res.status(200).json(habit_entry);                                
    }}));

// ------ ENDPOINT #3: Pull data by ID - Side Scroller -------
app.get('/hikes/:id', asyncHandler (async (req, res) => {    
    let hike_entry = await hikes.getHikesDataById(req.params.id);
    if (hike_entry === null){
        res.status(404).json(ERROR_NOT_FOUND);                           
    } else {
        res.status(200).json(hike_entry);                              
    }}));

// --------------------------------------------- UPDATE OPERATIONS ---------------------------------------------------------

// --------ENDPOINT #4: Update - Calories ---------
app.put('/calories/:id', asyncHandler (async (req, res) => {    
    const oldEntry = await calories.getCalorieEntryById(req.params.id);
    let eProperties = Object.keys(oldEntry);
    for (let i=0; i < eProperties.length; i++){             
        if(Object.hasOwnProperty(eProperties[0]) !== Object.hasOwnProperty(req.body)){
        res.status(400).json(ERROR_INVALID_REQ); 
    }}
    let updatedEntry = await calories.updateCalorieEntry(req.params.id, req.body); 
    res.status(200).json(updatedEntry);                           
}));

// --------ENDPOINT #4: Update - Selections ---------
app.put('/selections/:id', asyncHandler (async (req, res) => {    
    const oldEntry = await selections.getSelectionById(req.params.id);
    let eProperties = Object.keys(oldEntry);
    for (let i=0; i < eProperties.length; i++){                  
        if(Object.hasOwnProperty(eProperties[0]) !== Object.hasOwnProperty(req.body)){
        res.status(400).json(ERROR_INVALID_REQ);                    
    }}
    let updatedEntry = await selections.updateSelection(req.params.id, req.body); 
    res.status(200).json(updatedEntry);                           
}));

// --------ENDPOINT #4: Update - Side Scroller ---------
app.put('/side_scroller/:levelId', asyncHandler (async (req, res) => {    
    const oldData = await side_scroller.getSideScrollerDataByLevelId(req.params.levelId);
    let eProperties = Object.keys(oldData);
    for (let i=0; i < eProperties.length; i++){                    
        if(Object.hasOwnProperty(eProperties[0]) !== Object.hasOwnProperty(req.body)){
        res.status(400).json(ERROR_INVALID_REQ);                  
    }}
    let updatedData = await side_scroller.updateSideScrollerData(req.params.levelId, req.body); 
    res.status(200).json(updatedData);                           
}));

// --------ENDPOINT #4: Update - Habits ---------
app.put('/habits/:id', asyncHandler (async (req, res) => {    
    const oldEntry = await habits.getHabitsDataById(req.params.id);
    let eProperties = Object.keys(oldEntry);
    for (let i=0; i < eProperties.length; i++){                
        if(Object.hasOwnProperty(eProperties[0]) !== Object.hasOwnProperty(req.body)){
        res.status(400).json(ERROR_INVALID_REQ);                
    }}
    let updatedEntry = await habits.updateHabitsData(req.params.id, req.body); 
    res.status(200).json(updatedEntry);                           
}));

// --------ENDPOINT #4: Update - Hikes ---------
app.put('/hikes/:id', asyncHandler (async (req, res) => {   
    const oldEntry = await hikes.getHikesDataById(req.params.id);
    let eProperties = Object.keys(oldEntry);
    for (let i=0; i < eProperties.length; i++){                  
        if(Object.hasOwnProperty(eProperties[0]) !== Object.hasOwnProperty(req.body)){
        res.status(400).json(ERROR_INVALID_REQ);                    
    }}
    let updatedEntry = await hikes.updateHikesData(req.params.id, req.body); 
    res.status(200).json(updatedEntry);                           
}));

// ------------------------------------------------ DELETE OPERATIONS ------------------------------------------------

// --------ENDPOINT #5: Delete data - Calories---------
app.delete('/calories/:id', asyncHandler (async (req, res) => {    
    let toRemove = await calories.getCalorieEntryById(req.params.id);
        if (toRemove === null){
        res.status(404).json(ERROR_NOT_FOUND);                             
    } else {
        await calories.deleteCalorieEntryById(req.params.id);               
        res.status(204).end();
}}));

// --------ENDPOINT #5: Delete data - Selection---------
app.delete('/selections/:id', asyncHandler (async (req, res) => {    
    let toRemove = await selections.getSelectionById(req.params.id);
        if (toRemove === null){
        res.status(404).json(ERROR_NOT_FOUND);                             
    } else {
        await selections.deleteSelectionById(req.params.id);                
        res.status(204).end();
}}));

// --------ENDPOINT #5: Delete data - Side Scroller---------
app.delete('/side_scroller/:id', asyncHandler (async (req, res) => {    
    let toRemove = await side_scroller.getSideScrollerDataById(req.params.id);
        if (toRemove === null){
        res.status(404).json(ERROR_NOT_FOUND);                            
    } else {
        await side_scroller.deleteSideScrollerDataById(req.params.id);      
        res.status(204).end();
}}));

// --------ENDPOINT #5: Delete data - Habits---------
app.delete('/habits/:id', asyncHandler (async (req, res) => {    
    let toRemove = await habits.getHabitsDataById(req.params.id);
        if (toRemove === null){
        res.status(404).json(ERROR_NOT_FOUND);                            
    } else {
        await habits.deleteHabitsDataById(req.params.id);                    
        res.status(204).end();
}}));

// --------ENDPOINT #5: Delete data - Hikes---------
app.delete('/hikes/:id', asyncHandler (async (req, res) => {    
    let toRemove = await hikes.getHikesDataById(req.params.id);
        if (toRemove === null){
        res.status(404).json(ERROR_NOT_FOUND);                            
    } else {
        await hikes.deleteHikesDataById(req.params.id);                     
        res.status(204).end();
}}));
