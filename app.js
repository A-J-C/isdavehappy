require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;

let season = 'standard';
let mood = 'happy';

app.use(express.json());

function serveFile(filename, res) {
  res.sendFile(__dirname + '/' + filename);
}

app.get('/', (_req, res) => {
  serveFile('index.html', res);
});

app.get('/admin', (_req, res) => {
  serveFile('admin.html', res);
});

app.get('/get_dave', (_req, res) => {
  res.sendFile(__dirname + `/public/daves/${season}_${mood}_dave.png`);
});

app.get('/get_states', (_req, res) => {
  const states = {
      season: season, 
      mood: mood
  };
  res.json(states);
});

function isPasswordValid(providedPassword) {
  const decodedPassword = Buffer.from(providedPassword, 'base64').toString('ascii');
  return decodedPassword === process.env.PASSWORD;
}

app.post('/check_password', (req, res) => {
  if (isPasswordValid(req.body.password)) {
      res.json({ authorized: true });
  } else {
      res.json({ authorized: false });
  }
});

function setState(req, res, stateType) {
  const newState = req.body[stateType];

  if (isPasswordValid(req.body.password)) {
      if (newState) {
          if (stateType === 'mood') {
              mood = newState;
          } else if (stateType === 'season') {
              season = newState;
          }
          res.send(`${stateType} updated to: ${newState}`);
      } else {
          res.status(400).send(`Invalid request: no ${stateType} provided`);
      }
  } else {
      res.status(401).send('Unauthorized');
  }
}

app.post('/set_mood', (req, res) => {
  setState(req, res, 'mood');
});

app.post('/set_season', (req, res) => {
  setState(req, res, 'season');
});


app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log(`Listening on port ${port}`));