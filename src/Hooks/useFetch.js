import { useEffect, useState } from "react";
import { mainFormHandlerTypeRaw } from "../util/http";

export const useFetch = ({method , type , fromData='' , token})=>{     
   const [data , setData] = useState()
   const [loading , setLoading] = useState(false)

  useEffect(()=> { 
    
    const getSpecificCategories = async()=>{
      setLoading(true)
    const message = await mainFormHandlerTypeRaw({
      method,
      type,
      fromData,
      token
    });    
    setLoading(false)
    setData(message)
}
  getSpecificCategories()
  }, [method , type , fromData , token]);
    
   return {
    data ,
    loading
   } 
}
