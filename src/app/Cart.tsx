import { Platform, StyleSheet, Text, View,FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { useCart } from '../provider/CartProvider';

import CartListItem from '../components/CartListItem';



const CartScreen = () => {
  const {items} = useCart();
  return (
    <View>
      <FlatList
      data={items}
      renderItem={({item})=> <CartListItem cartItem={item}/>}
      contentContainerStyle={{padding:10, gap:10}}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})