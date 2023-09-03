const express = require('express');
const router = express.Router();
const pool = require('../database/weekend-to-do-app');


//Create a task -POST REQUEST- expect text - return task is completed 
router.post('/create-task', (req, res) => {
    console.log('hello world'); 
    let newTask = req.body
  
    console.log("res.body:", req.body);
  
    const queryText = `
    INSERT INTO tasks (text)
    VALUES ($1)
    `
  
    console.log('The query we\'re sending to postgres:', queryText);
    pool.query(queryText, [newTask.text])
        .then(
            (result) => {
                res.sendStatus(200);
            }
        ).catch(
            (err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            }
        )
  });
  
  // Mark as completed - put request - Send ID - return updated task
  router.put('/mark-completed/:taskId', (req, res) => {
    console.log('hello world'); 
    let taskId = req.params.taskId
  console.log(taskId);
   
  
    const queryText = `
    UPDATE tasks SET "isComplete"='true' WHERE id = $1;
    `
  
    console.log('The query we\'re sending to postgres:', queryText);
  
    pool.query(queryText, [taskId])
        .then(
            (result) => {
                res.sendStatus(200);
            }
        ).catch(
            (err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            }
        ) 
  });
  
  // DELETE a task -  Delete request - Receive ID - message "task is deleted"
  router.delete('/delete-task/:taskId', (req, res) => {
    console.log('hello world');  
    let taskId = req.params.taskId
  
   
  
    const queryText = `
    DELETE FROM "tasks" WHERE "id" = $1;
  
    `
  
    console.log('The query we\'re sending to postgres:', queryText);
  
    // Then, find a way to pass it to our pool (aka, the connection to the db).
    // Then it's pg's problem
    pool.query(queryText, [taskId])
        .then(
            (result) => {
                res.sendStatus(200);
            }
        ).catch(
            (err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            }
        ) 
  });
  
  
  // Get All Task - Get request - no input - return all tasks
  router.get('/get-tasks', (req, res) => {
    console.log('hello world');  
    let queryText = 'SELECT * FROM "tasks" ORDER BY id desc;'
  
    pool.query(queryText).then(
        (result) => {
            res.send(result.rows)
        }
    ).catch(
        (err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        }
    )
  });
  module.exports = router;