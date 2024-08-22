import { StyleSheet, Text, TextInput, View,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name,setName] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFields = ()=>{
        setName("");
        setPrice("");
    }

    const validateInput = ()=>{
        setErrors("");
        if(!name){
            setErrors( "Name is required")
            return false;
        }
        if(!price){
            setErrors("Price is required")
            return false;
        }
        if(isNaN(parseFloat(price))){
            setErrors("Price must be a number")
            return false;
        }
        return true;
    };
    
    const onCreate = ()=>{
        if(!validateInput()){
            return;
        }
        console.warn('create product: ' , name);

        resetFields();
    };
    const onUpdateCreate =()=>{
        if(!validateInput()){
            return;
        }
        console.warn('Updateing product: ' , name);
        resetFields();
    }
    const onSubmit = ()=>{
        if(isUpdating){
            onUpdateCreate();
        }else{
            onCreate();
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const onDlt = ()=>{
        console.warn("Deleted");
      }
      const confirmDlt = ()=>{
        Alert.alert('confirm', 'Are you sure you want to delete this product?', [
            {
            text: 'Cancel',
            },
            {
                text:"Delete",
                style:'destructive',
                onPress: onDlt
            }
        ])
      }
    

    
  return (
    <View style={styles.container}>
        <Stack.Screen options={{title:isUpdating?"Update Product":"Create Product"}}/>

        <Image source={{uri:image || defaultPizzaImage}} style={styles.image} />

        <Text onPress={pickImage} style={styles.textBtn}>Slect Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput 
      value={name}
      onChangeText={setName}
      placeholder='name' 
      style={styles.input}
      />

      <Text style={styles.label}>Price:($)</Text>
      <TextInput 
      value={price}
      onChangeText={setPrice}
      placeholder='9.99' 
      style={styles.input}
      keyboardType='numeric'

      />
    <Text style={{color:"red"}}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating?"Update":'Create'}/>
      {isUpdating && <Text onPress={confirmDlt} style={styles.textBtn}>Delete</Text>}
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        padding:10,
    },
    image:{
        width:"50%",
        aspectRatio:1,
        alignSelf:"center"
    },
    textBtn:{
        alignSelf:"center",
        fontWeight:"bold",
        color:Colors.light.tint,
        marginVertical:10,
    },
    label:{
        color:"gray",
        fontSize:16,
    },
    input:{
        backgroundColor:"white",
        padding:10,
        borderRadius:5,
        marginTop:5,
        marginBottom:20,
    },
})