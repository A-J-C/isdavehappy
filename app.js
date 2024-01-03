require('dotenv').config();
const express = require('express');
const redis = require('redis');
const app = express();
const port = process.env.PORT || 8080;

const redisClient = redis.createClient({
  url: process.env.REDIS_URL 
});

redisClient.connect();

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

app.get('/get_states', async (_req, res) => {
  try {
    const season = await redisClient.get('season') || 'standard';
    const mood = await redisClient.get('mood') || 'happy';
    res.json({ season, mood });
  } catch (err) {
    res.status(500).send('Error fetching states');
  }
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

async function setState(req, res, stateType) {
  const newState = req.body[stateType];

  if (isPasswordValid(req.body.password)) {
      if (newState) {
          try {
              await redisClient.set(stateType, newState);
              res.send(`${stateType} updated to: ${newState}`);
          } catch (err) {
              res.status(500).send('Error updating state');
          }
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