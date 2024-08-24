import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/superbase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session : Session | null;
    isLoading:boolean;
    profile:any;
    isAdmin:boolean
}

const AuthContext = createContext<AuthData>({
    session:null,
    isLoading:true,
    profile:null,
    isAdmin:false,
});

export default function AuthProvider({children}:PropsWithChildren){
    const [session , setSession] = useState<Session | null>(null);
    const [isLoading , setIsLoading] = useState(true);
    const [profile,setProfile] = useState(null);

    useEffect(()=>{
        const fetchSession = async ()=>{
          const {data:{session}} =  await supabase.auth.getSession();
          setSession(session);
         
          if (session) {
            // fetch profile
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setProfile(data || null);
          }
          setIsLoading(false);
        };

        fetchSession();

        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
        })
    },[]);

    

    return (
    <AuthContext.Provider value={{session , isLoading , profile, isAdmin: profile?.group ==="ADMIN"}}>{children}</AuthContext.Provider>
    );
}

export const useAuth = ()=> useContext(AuthContext);