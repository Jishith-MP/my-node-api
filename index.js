const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store
let dataStore = [
    { id: 1, name: 'Jishith MP', class: 'BCom' },
    { id: 2, name: 'Abhijith', class: 'ITI' },
    { id: 3, name: 'Abhiram', class: 'Poly' }
];

// Serve the HTML file (optional if you have an index.html)
app.get('/', (req, res) => {
    res.send('Welcome to the API! Use /api/items to access the items.');
});

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

// POST a new item
app.post('/api/items', (req, res) => {
    const { name, class: className } = req.body; // Using className to avoid using reserved word 'class'
    const newItem = {
        id: dataStore.length + 1,
        name: name,
        class: className
    };
    dataStore.push(newItem);
    res.status(201).json(newItem); // Respond with the created item
});

// PUT (update) an item by ID
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = dataStore.find(item => item.id === id);

    if (item) {
        const { name, class: className } = req.body; // Using className to avoid using reserved word 'class'
        item.name = name !== undefined ? name : item.name;
        item.class = className !== undefined ? className : item.class;
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