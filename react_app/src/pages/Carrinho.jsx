import ItemCarrinho from '../components/ItemCarrinho';
import { useState, useEffect } from 'react';

function Carrinho() {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false);

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
    }, [refresh]);

    const refreshData = () => {
        setRefresh(!refresh);
    }

    return (
        <div className='carrinho-lista'>
            <h1>Carrinho</h1>
            <div className='cabecalho-item-carrinho'>
                    
                    <div style={{width: '325px', textAlign: 'left', fontSize: '15px'}}>
                    <p>Item</p>
                    </div >

                    <div style={{width: '55px', textAlign: 'left', fontSize: '15px'}}>
                    <p>Preço</p>
                    </div>

                    <div style={{width: '150px', textAlign: 'left', fontSize: '15px'}}>
                    
                    <p>Quantidade</p>

                    </div>

                </div>
            
            {data && data.map((item) => (
                <ItemCarrinho json={item} page_refresh={refreshData}/>
            ))}
        </div>
    );
}
export default Carrinho;
