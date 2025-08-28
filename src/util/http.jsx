import axios from "axios"

const baseServerUrl = process.env.REACT_APP_Base_API_URL

export const mainFormHandlerTypeRaw = async({
method,
type ,
fromData ,
token ,
count 
}
)=>{
let headers ={
  token:token
}
 
let response= null;
try{
if(method==="get"){  
  response= await axios.get(`${baseServerUrl}${type}`, {headers})  
}

else if(method==="post"){
  response = await axios.post(`${baseServerUrl}${type}`, fromData , {headers} )   
}
else if(method==="put"){  
  response=await axios.put(`${baseServerUrl}${type}` , {count} , {
    headers
  });     
}
else if(method==="delete"){    
  response = await axios.delete(`${baseServerUrl}${type}`, {headers})  
}
else if (method==="REMOVE-ALL-CART-ITEM"){  
 response = await axios.delete(`${baseServerUrl}${type}`, {headers})  
}
return response ;

}

catch(error){    
return error
}

}

