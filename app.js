const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let items = [];

// GET /items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// GET /items/:id
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// PUT /items/:id
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const newItem = req.body;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === itemId) {
      items[i] = newItem;
      res.json(newItem);
      return;
    }
  }
  res.status(404).json({ message: 'Item not found' });
});

// DELETE /items/:id
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
