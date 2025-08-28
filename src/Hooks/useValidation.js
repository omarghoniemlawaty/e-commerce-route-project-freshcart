import * as Yup from "yup"

export const useValidation = ()=>{
 const name = Yup.string().min(3, "must be at least 3 chars'").required("required");
 const details = Yup.string().min(10 ,"must be at least 10 chars'").required("required");
 const email = Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/, "Email must be a valid email" ).required("required")
 const password= Yup.string().matches(/^[a-zA-Z0-9-@]{6,}$/, "must start with at least 6 letters or number").required("required");
 const rePassword =Yup.string().oneOf([Yup.ref("password")] , "password and password don't match").required("required"); 
 const phone = Yup.string().matches(/^01[0125][0-9]{8}$/ ,"phone is invalid").required("required");
 return (
   {
    name ,
    email , 
    password ,
    rePassword, 
    phone ,
    details
   }
 )
}