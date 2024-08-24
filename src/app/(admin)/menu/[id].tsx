
import { StyleSheet, Text, View,Image, Pressable, ActivityIndicator } from 'react-native'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useCart } from '@/src/provider/CartProvider';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';


const ProductDetailsScreen = () => {
  const { id:idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const {data:product,error,isLoading} = useProduct(id);
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Faild to fetch products</Text>
  }


  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <Link href ={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          title:"Menu"
          }}/>
      <Stack.Screen options={{title: product?.name}}/>
      <Image
      source={{uri:product?.image || defaultPizzaImage}}
      style={styles.image}
      />
      <Text  style={styles.title}>{product?.name}</Text>
      <Text  style={styles.price}>${product?.price}</Text>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"white",
    padding: 10,
  },
  image:{
    width: "100%",
    aspectRatio:1,
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
  },
  price:{
    fontSize:18,
    fontWeight:"semibold",
   
  },
  
})
export default ProductDetailsScreen

