import { createContext } from "react";

export const CartContext= createContext({
  items:[] ,
  cart_id:'',
  addProductToCart:()=>{} , 
  updateProductInCart:()=>{},
  removeSpecificCartItem:()=>{} ,
  clearUserCartProducts:()=>{},
  fetchCart:()=>{},
}) 