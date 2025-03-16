import React, { useState, useEffect } from 'react';

function ExampleRequests() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Basic GET request using fetch
    const makeBasicRequest = async () => {
        try {
            const response = await fetch('http://localhost:3030/api/compras');
            const data = await response.json();
            setData(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // GET request with URL parameters
    const getProductById = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`);
            const data = await response.json();
            setData(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // GET request with query parameters
    const searchProducts = async (searchTerm) => {
        try {
            const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setData(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>API Request Examples</h2>
            
            <div>
                <button onClick={makeBasicRequest}>Get All Products</button>
                <button onClick={() => getProductById(1)}>Get Product 1</button>
                <button onClick={() => searchProducts('test')}>Search Products</button>
            </div>

            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {data && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ExampleRequests; 