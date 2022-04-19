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

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
