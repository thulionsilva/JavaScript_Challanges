import ItemCarrinho from '../components/ItemCarrinho';
import { useAuth } from '../contexts/LoginContext';
import { useState, useEffect } from 'react';


function Carrinho() {
    type ItemCarrinhoType = {
        "user_name": string;
        "product_id": number;
        "last_added": number;
        "quantity": number;
    }
    const [data, setData] = useState<ItemCarrinhoType[] | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const {user} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            console.log(user);
            try {
                const response = await fetch('http://localhost:3030/api/compras?user_name=' + user);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [refresh, user]);

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
            
            {data && data.map((item:ItemCarrinhoType) => (
                <ItemCarrinho json={item} page_refresh={refreshData}/>
            ))}
        </div>
    );
}
export default Carrinho;
