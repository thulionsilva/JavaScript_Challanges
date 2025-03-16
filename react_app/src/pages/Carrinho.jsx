import ItemCarrinho from '../components/ItemCarrinho';
import { useState, useEffect } from 'react';

function Carrinho() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3030/api/compras');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Carrinho</h1>
            {data && data.map((item) => (
                <ItemCarrinho product_id={item.product_id} quantity={item.quantity} />
            ))}
        </div>
    );
}
export default Carrinho;
