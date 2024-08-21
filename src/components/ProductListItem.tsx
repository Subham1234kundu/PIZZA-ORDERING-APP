import { Image, Text, View,StyleSheet, Pressable } from "react-native"
import Colors from "../constants/Colors";
import { Product } from "../types";
import { Link } from "expo-router";


export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemPrmsProps = {
    product: Product;
} 

const ProductListItem = ({product}:ProductListItemPrmsProps)=>{
    return (
        <Link href={`/menu/${product.id}`} asChild>
        <Pressable  style={styles.container}>
        <Image 
        source={{uri:product.image || defaultPizzaImage}} 
        style={styles.image}
        resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
        </Link>

    )
  }


  const styles = StyleSheet.create({
    container: {
      backgroundColor:"#ffffff",
      padding:10,
      borderRadius:20,
      flex:1,
      maxWidth:"50%"
    },
    image:{
      width:"100%",
      aspectRatio:1
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginVertical:10
    },
    price:{
      color:Colors.light.tint,
      fontWeight:"bold"
    },
  
  });
  
  export default ProductListItem;