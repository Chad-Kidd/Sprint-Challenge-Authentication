require('dotenv').config(); // load .env variables
// const express = require('express');
// const cors = require('cors');

const server = require('./api/server.js');

const port = process.env.PORT || 2000;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});

//working
server.get('/', (req, res) => {
  res.send('IM GONNA RIDE TILL I CANT NO MORE!');
})