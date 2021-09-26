const express = require('express');
const path = require('path');
const getSecondMaximum = require('./func.js');
const app = express();

app.use(express.json());

app.use('/api', async (req, res) => {
  const Arr = req.body.array;
  const val = getSecondMaximum(Arr);
  return res.send({ secondMax: val });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.send('HURRAH');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
