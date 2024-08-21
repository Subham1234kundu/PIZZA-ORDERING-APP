
import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';

const sizes = ["S","M","L","XL"];


const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize , setSelectedSize] = useState("M");
  const product = products.find((p) => p.id.toString() === id);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product?.name}}/>
      <Image
      source={{uri:product?.image || defaultPizzaImage}}
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
      <Button text="Add to Cart"  />
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

