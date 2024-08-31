import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

import { supabase } from '@/src/lib/superbase'
import { useRouter } from 'expo-router'

const ProfileScreen = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      // Redirect to the login screen or any other appropriate screen
      router.replace("/(auth)/sign-in"); // Adjust the route as necessary
    }
  };
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='Sign Out' onPress={()=>handleSignOut()} />

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})