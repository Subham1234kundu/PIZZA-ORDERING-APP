
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { CartItem, Product } from '../types';
import { randomUUID } from 'expo-crypto';

type CartType = {
    items : CartItem[];
    addItem:(product:Product, size:CartItem['size']) => void;
    updateQuantity: (itemId:string, amount:-1|1) => void
  }

 const cartContext =  createContext<CartType>({
    items:[],
    addItem:() => {},
    updateQuantity:()=>{}
 });

const CartProvider = ({children}:PropsWithChildren) => {
    const [items , setItems] = useState<CartItem[]>([]);

    //add items
    const addItem = (product:Product, size:CartItem['size']) => {
        
        //if already in the cart, increment quaNTITY
         const existingItem = items.find(item => item.product===product && item.size === size);

         if(existingItem){
            updateQuantity(existingItem.id,1);
            return;
         }

        const newCartItem: CartItem = {
            id:randomUUID(),
            product,
            size,
            quantity: 1,
            product_id:product.id
        }

        setItems([newCartItem , ...items])
    };

    //UPDATEQUANTITY
    const updateQuantity = (itemId:string, amount:-1|1)=>{
       const updatedItems = items.map(item => item.id !== itemId ? item : {...item , quantity:item.quantity+amount}).filter((item)=> item.quantity > 0);
       setItems(updatedItems);
    }

    return (
        <cartContext.Provider 
        value={{items , addItem,updateQuantity}}
        >
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(cartContext);

