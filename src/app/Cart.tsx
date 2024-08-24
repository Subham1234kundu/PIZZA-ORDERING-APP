import { Platform, StyleSheet, Text, View,FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { useCart } from '../provider/CartProvider';

import CartListItem from '../components/CartListItem';
import Button from '../components/Button';



const CartScreen = () => {
  const {items , total} = useCart();
  return (
    <View style={{padding:10}}>
      <FlatList
      data={items}
      renderItem={({item})=> <CartListItem cartItem={item}/>}
      contentContainerStyle={{padding:10, gap:10}}
      />

      <Text>Total: ${total}</Text>
      <Button text='Checkout'/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})