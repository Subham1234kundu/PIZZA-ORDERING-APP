
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { CartItem } from '../types';
import { randomUUID } from 'expo-crypto';
import { Tables } from '../database.types';
import { useInsertOrders } from '../api/products/orders';
import { useRouter } from 'expo-router';
import { useInsertOrderItems } from '../api/products/order-items';
import {initialisePaymentSheet,openPaymentSheet  } from '../lib/stripe';


type Product = Tables<"products">
type CartType = {
    items : CartItem[];
    addItem:(product:Product, size:CartItem['size']) => void;
    updateQuantity: (itemId:string, amount:-1|1) => void;
    total: number;
    checkOut:()=>void;
  }

 const cartContext =  createContext<CartType>({
    items:[],
    addItem:() => {},
    updateQuantity:()=>{},
    total:0,
    checkOut:()=>{},
 });

const CartProvider = ({children}:PropsWithChildren) => {
    const [items , setItems] = useState<CartItem[]>([]);
    const {mutate:insertOrder} = useInsertOrders();
    const {mutate:insertOrderItems} = useInsertOrderItems();
    const router = useRouter();

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
    };

    //Total items
    const total =  items.reduce((sum, item) => (sum += item.product.price * item.quantity),0);

    const clearCart = ()=>{
        setItems([]);
    }
    //ordering
    const checkOut = async()=>{
        await initialisePaymentSheet(Math.floor(total * 100));
        const payed = await openPaymentSheet();
        if(!payed){
            return;
        }
        insertOrder({total},{
            onSuccess:saveOrderItems
        }
            
        )
    };

    const saveOrderItems = (order:Tables<"orders">)=>{
       
        const orderItems = items.map((cartItem)=>({
            order_id:order.id,
            product_id:cartItem.product_id,
            quantity:cartItem.quantity,
            size:cartItem.size
        }));
        insertOrderItems(
            orderItems,
            {onSuccess(){
            console.log(order);
            clearCart();
            router.push(`/(user)/orders/${order.id}`);
        }});

    }

    return (
        <cartContext.Provider 
        value={{items , addItem,updateQuantity,total,checkOut}}
        >
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(cartContext);

