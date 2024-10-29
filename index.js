const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let dataStore = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// GET all items
app.get('/api/items', (req, res) => {
    res.status(200).json(dataStore);
});

// GET a specific item by ID
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = dataStore.find(item => item.id === id);

    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE an item by ID
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    dataStore = dataStore.filter(item => item.id !== id);
    res.status(204).send(); // No content
});

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});