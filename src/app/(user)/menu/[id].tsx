
import { StyleSheet, Text, View,Image, Pressable, ActivityIndicator } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';
import { useProduct } from '@/src/api/products';
import RemoteImage from '@/src/components/RemoteImg';

const sizes: PizzaSize[] = ["S","M","L","XL"];


const ProductDetailsScreen = () => {
  const { id:idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const {data:product,error,isLoading} = useProduct(id);
  const {addItem} = useCart();

  const [selectedSize , setSelectedSize] = useState<PizzaSize>("M");


  const router = useRouter();
 
  const addToCart = ()=>{
    if(!product){
      return ;
    }
    addItem(product , selectedSize);
    router.push("/Cart")
  }
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Faild to fetch products</Text>
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product?.name}}/>
      <RemoteImage
      path={product?.image}
      fallback={defaultPizzaImage}
      style={styles.image}
      />
      <Text>Select Size</Text>
      
      <View style={styles.sizes}>
      {sizes.map((size) => (
        <Pressable 
        onPress={()=> setSelectedSize(size)}
        style={[ styles.size , {backgroundColor:selectedSize === size ? "gainsboro" :"white" }]} 
        key={size}>
          <Text style={[styles.sizeText , {color:selectedSize === size ? "black" : "gray"}]}>{size}</Text>
        </Pressable>
        ))}
      </View>
      
      <Text  style={styles.price}>${product?.price}</Text>
      <Button text="Add to Cart" onPress={addToCart}  />
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
  price:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:"auto"
  },
  sizes:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginVertical:10
  },
  size:{
   
    width:50,
    aspectRatio:1,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
  },
  sizeText:{
    fontSize:18,
    fontWeight:"500",
  }
})
export default ProductDetailsScreen

