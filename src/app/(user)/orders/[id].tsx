import orders from '@/assets/data/orders';
import { useOrderDetails } from '@/src/api/products/orders';
import { useUpdateOrderSubscription } from '@/src/api/products/orders/subscriptions';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

const OrderDetailsScreen = () => {
  const { id:idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const {data:order,error,isLoading} = useOrderDetails(id);
  useUpdateOrderSubscription(id)
    

    if(!order){
        return <Text>Order not found</Text>;
    }
    if(isLoading){
      return <ActivityIndicator/>
    }
    if(error){
      return <Text>Faild to fetch products</Text>
    }

  return (
    <View style={{padding:10,gap:20}}>
        <Stack.Screen options={{title:`Order #${id}`}}/>
        
        <FlatList
        data={order.order_items}
        renderItem={({item})=><OrderItemListItem item={item}/>}
        contentContainerStyle={{gap:10}}
        ListHeaderComponent={<OrderListItem order={order}/>}
        />
    </View>
  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({})