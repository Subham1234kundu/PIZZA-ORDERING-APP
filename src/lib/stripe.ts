import { Alert } from "react-native";
import { supabase } from "./superbase"
import { initPaymentSheet, PaymentIntent, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async(amount:number)=>{
    const { data, error } = await supabase.functions.invoke('payment-sheet', {
        body: { amount },
      });
    
      if (data) {
        return data;
      }
      Alert.alert(`Error: ${error?.message ?? 'no data'}`);
      return {};
}

export const initilisePaymentSheet = async (amount:number)=>{
    const { paymentIntent, publishableKey,customer,ephemeralKey } = await fetchPaymentSheetParams(amount);

    if (!publishableKey || !paymentIntent) return;
  
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Subham',
      customerId: customer,
      customerEphemeralKeySecret:ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      defaultBillingDetails: {
        name: 'Subham Kundu',
      },
    });
};

export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
  
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
          return false;
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
          return true;
    }
  };