const express = require('express');
const app = express();

// Basic GET request
app.get('/api/products', (req, res) => {
    res.json({
        message: 'Success',
        data: [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' }
        ]
    });
});

// GET request with URL parameters
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    res.json({
        message: 'Success',
        data: { id: productId, name: `Product ${productId}` }
    });
});

// GET request with query parameters
app.get('/api/search', (req, res) => {
    const query = req.query.q;  // accessed as /api/search?q=searchterm
    res.json({
        message: 'Success',
        search: query,
        results: [`Results for ${query}`]
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 