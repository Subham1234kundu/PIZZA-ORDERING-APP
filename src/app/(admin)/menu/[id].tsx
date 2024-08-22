
import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useCart } from '@/src/provider/CartProvider';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';


const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const {addItem} = useCart()


  const product = products.find((p) => p.id.toString() === id);

  const router = useRouter();

  const addToCart = ()=>{
    if(!product){
      return;
    }
   
    router.push("/Cart")
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

