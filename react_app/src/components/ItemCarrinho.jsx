import { useState, useEffect } from 'react';
import produtos from '../produtos.json';
function ItemCarrinho({product_id, quantity}) {
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        const product2 = produtos.find(p => p.ID === parseInt(product_id));
        
        if (product2) {
            setProduct(product2);
        }
        else {
            setProduct("Produto não encontrado");
        }
    }, [product_id]);


    return (
        <div className='item-carrinho'>
            
            {product ? (
                <div>
                    <p>{quantity}</p>
                    <p>{product.Nome}</p>
                    <p>{product.Preço}</p>
                    <p>{product.Preço * quantity}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}   
export default ItemCarrinho;
