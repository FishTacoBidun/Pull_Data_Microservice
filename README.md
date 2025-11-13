For a program to use this microservice, they must have a defined schema in a model.mjs for that program and they must have defined CRUD operations in the controller that accesses that model.

A connected program can utilize all CRUD operations: 

      GET all program data from database (reads data), 
      
      GET one program data by ID from database (reads data), 
      
      POST one program data into database (creates data), 
      
      PUT on program data by ID from database (edits data), 
      
      DELETE one data by ID from database (deletes data).


If query parameters are needed, the controller will need to have a conditional statement included to look for that parameter and the calling program must add ?key=value&key=value at the end of the GET all fetch request string shown.
Only Calorie Tracker application uses this functionality, so if other programs desire this, this is an addition that is accounted for in this contract.


How to programmatically REQUEST data from the microservice: 

  Formatting for a request all: 
  
      await fetch('/name_of_import') 
      
                  // name_of_import is the controller's imported name for the model being accessed
      
  Formatting for a request one data entry by ID: 
  
      await fetch() and inside the parenthesis, put the controller's imported name for the model being accessed, a slash, and the id of the entry like this: (`/name/${id}`)
          
                 // you may need to refer to the object property to get the id, so if people was the object, (`/name/${people.id}`)
              
  Examples of requests from connected programs to microservices for GET all: 
  
    const response = await fetch('/habits');
    
                // this is the habit tracker application's call
                
    const response = await fetch('/hikes'); 
    
                // this is the hikes tracker application's call
                
    const response = await fetch('/side_scroller');        
    
                // this is the side scroller application's call
                
    const response = await fetch('/calories');    
    
                // this is the calorie tracker application's call for calorie entries
                
    const response = await fetch('/selections');        
    
                // this is the calorie tracker application's call for meal/exercise data
                

Examples of requests from connected programs to microservices for GET one:

    const response = await fetch(`/habits/${habit.id}`);                       
    
                // this is the habit tracker application's call
    
    const response = await fetch(`/hikes/${hike.id}`);                         
    
                // this is the hikes tracker application's call
    
    const response = await fetch(`/side_scroller/${s_s_object.id}`);           
    
                // this is the side scroller application's call

    const response = await fetch(`/calories/${calorie_entry.id}`);             
    
                // this is the calorie tracker application's call for calorie entries
    
    const response = await fetch(`/selections/${option.id}`);                  
    
                // this is the calorie tracker application's call for meal/exercise data

    
How to programmatically RECEIVE data from the microservice: 

  Formatting for receiving the data:
  
      const data = await response.json();     
      
                  // used for GET operation shown above. PUT, POST, and DELETE just use response.status to track status of the operation.
                                              
                  // data will be an array of objects that meet the GET all request or a singular object that was requested by ID from a GET one request.
      
                                             
  Examples of receiving data from the microservice for both GET options:
  
    const calorie_entries = await response.json();                
    
                // this is what the calorie tracker application uses to read a GET of calorie entries
                
    const selection_options = await response.json();              
    
                // this is what the calorie tracker application uses to read a GET of meal or exercise options
                
    const side_scroller_data = await response.json();             
    
                // this is what the side scroller application uses to read a GET of side scroller entries
                
    const hikes_data = await response.json();                     
    
                // this is what the hikes tracker application uses to read a GET of hike entries
                
    const habits_data = await response.json();                    
    
                // this is what the habits tracker application uses to read a GET of habit entries

    
UML sequence diagram: 
