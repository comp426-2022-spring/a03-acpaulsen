// Require Express.js
const express = require('express')
const app = express()
var min = require("minimist")(process.argv.slice(2))
const HTTP_PORT = min.port||process.env.PORT||5000

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

//standard flip
app.get('/app/flip/', (req, res) => {
    res.status(200).json({"flip" : coinFlip()})
});

//guess flip
app.get('/app/flip/call/tails', (req, res) => {
    const ter = flipACoin("tails")
    res.status(200).json(ter)
});

//heads version
app.get('/app/flip/call/heads', (req, res) => {
    const val = flipACoin("heads")
    res.status(200).json(val)
});

//number of flips
app.get('/app/flips/:number', (req, res) => {
    const array = coinFlips(req.params.number)
    res.status(200).json({ 'raw' : array, 'summary' : countFlips(array) })
    });

//FUNCTIONS 

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
    let result = Math.random();
    if (result <=.5)
      return "tails"
    return "heads"
  }

function flipACoin(call) {
    const flip = coinFlip()
    if(flip == call){
      results = "win"
    }
    else{
      results = "lose"
    }
    return  { call: call, flip: flip, result: results}
  }
  app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */ 

function coinFlips(flips) {
  let flipList = []; 
  let i = 0; 
    for (let i=0; i < flips; i++) {
      flipList.push(coinFlip());
    }
  return flipList;
  }

function countFlips(array) {
    let count = 0;
    for(let i = 0; i < array.length; i++){
      if(array[i] == "Heads"){
        count = count + 1;
    }
  
    return {tails: array.length - counter, heads: counter}};
  
  }

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
