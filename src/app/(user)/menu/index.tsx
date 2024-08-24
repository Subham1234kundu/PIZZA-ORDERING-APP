import {Text, View,FlatList, ActivityIndicator } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { useProductList } from '@/src/api/products';

export default function MenuScreen() {
  const {data:products,error,isLoading} = useProductList();
   
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Faild to fetch products</Text>
  }

  return (
    <View>
      <FlatList
      data={products}
      renderItem={({item})=> <ProductListItem product={item}/>}
      numColumns={2}
      contentContainerStyle={{gap:10 ,padding:10}}
      columnWrapperStyle={{gap:10 }}
      />
    </View>
  );
}

