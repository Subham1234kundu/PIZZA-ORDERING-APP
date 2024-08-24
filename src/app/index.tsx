import { View, Text } from 'react-native';

import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../provider/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { supabase } from '../lib/superbase';

const index = () => {
  const {session , isLoading,isAdmin} = useAuth();
  
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(!session){
    return <Redirect href={"/sign-in"}/>
  }
  if(!isAdmin){
    return <Redirect href={"/(user)"}/>
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={()=> supabase.auth.signOut()} text='sign out'/>
    </View>
  );
};

export default index;