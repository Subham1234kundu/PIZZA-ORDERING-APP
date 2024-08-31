
import { useMutation } from "@tanstack/react-query";
import { InsertTables } from "@/src/types";
import { supabase } from "@/src/lib/superbase";


export const useInsertOrderItems = ()=>{


  
    return useMutation({
      async mutationFn(itmes:InsertTables<"order_items">[]) {
        const {data:newProduct,error} = await supabase.from("order_items").insert(itmes).select();
        if(error){
          throw new Error(error.message);
        }
        return newProduct;
      },

  
    });
  };