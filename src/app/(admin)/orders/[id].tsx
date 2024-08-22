import orders from '@/assets/data/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import Colors from '@/src/constants/Colors';
import { OrderStatusList } from '@/src/types';
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

const OrderDetailsScreen = () => {
    const {id} = useLocalSearchParams();

    const order = orders.find(order => order.id.toString() === id);

    if(!order){
        return <Text>Order not found</Text>;
    }

  return (
    <View style={{padding:10,gap:20}}>
        <Stack.Screen options={{title:`Order #${id}`}}/>
        
        <FlatList
        data={order.order_items}
        renderItem={({item})=><OrderItemListItem item={item}/>}
        contentContainerStyle={{gap:10}}
        ListHeaderComponent={<OrderListItem order={order}/>}
        ListFooterComponent={()=>(
          <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => console.warn('Update status')}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

        )}
        />
    </View>
  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({})