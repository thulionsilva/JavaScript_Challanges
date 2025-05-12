import { useState, useEffect } from 'react';
import produtos from '../produtos.json';

type ProdutoType = {
    "ID": number;
    "Nome": string,
    "Preço": number,
    "Imagem": string,
    "Descrição": string,
    "Categoria": string,
    "Subcategoria": string,
    "Marca": string
    }

type ItemCarrinhoType = {
    "user_name": string;
    "product_id": number;
    "last_added": number;
    "quantity": number;
}
type ItemCarrinhoProps = {
    json: ItemCarrinhoType;
    page_refresh: () => void;
}
function ItemCarrinho({json, page_refresh}:ItemCarrinhoProps) {
    const [product, setProduct] = useState<ProdutoType | null>(null);

    useEffect(() => {

        const product2 = produtos.find(p => p.ID === json.product_id);

    
        if (product2) {
            setProduct(product2);
        }
        else {
            setProduct(null);
        }
    }, [json.product_id]);

    const removeItem = () => {
        const response = fetch('http://localhost:3030/api/compras', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name: json.user_name, product_id: json.product_id, last_added: null}),
        }); 
        console.log(response);
        page_refresh();
    };

    const addItem = () => {
        const response = fetch('http://localhost:3030/api/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name: json.user_name, product_id: json.product_id}),
        }); 
        console.log(response);
        page_refresh();
    }

    const removeOneItem = () => {
        const response = fetch('http://localhost:3030/api/compras', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name: json.user_name, product_id: json.product_id, last_added: json.last_added}),
        }); 
        console.log(response);
        page_refresh();
    }

    return (
        <div>

            {product ? (
                <div className='item-carrinho'>
                    <img src={product.Imagem} alt={product.Nome} style={{height: '100%'}} />
                    <div style={{width: '200px', textAlign: 'center', fontSize: '15px'}}>
                    <p>{product.Nome}</p>
                    </div >

                    <div style={{width: '20px', textAlign: 'center', fontSize: '20px'}}>
                    <p>{product.Preço}</p>
                    </div>

                    <div style={{display: 'flex',flexDirection: 'row' ,width: '15px', textAlign: 'center', fontSize: '20px', alignItems: 'center', gap: '5px'}}>
                    <button onClick={removeOneItem} style={{height: '20px', textAlign: 'center', fontWeight: 'bold'}}>-</button>
                    <p>{json.quantity}</p>
                    <button onClick={addItem} style={{height: '20px', textAlign: 'center', fontWeight: 'bold'}}>+</button>
                    </div>

                    <button onClick={removeItem} >Remover</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}   
export default ItemCarrinho;
