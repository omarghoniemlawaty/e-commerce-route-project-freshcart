import React, { useCallback , useReducer, useState } from "react";
import { mainFormHandlerTypeRaw } from "../util/http";
import { CartContext } from "./CartContext.jsx";
import { toast } from "react-toastify";

const URL_CART = `api/v1/cart`;

const handleProductReducer = (state , action) => {
  
  if (action.type === "INIT_CART") {    
    return { items: action.item };
  }

  if (action.type === "Add-ITEM") {
    const updateItems = [...state.items];
    const existingCartItemIndex = updateItems.findIndex((item) =>
      item.id === undefined
        ? item.product.id === action.item.id
        : item.id === action.item.id
    );
    if (existingCartItemIndex > -1) {

    } else {
      updateItems.push({ ...action.item , count: 1 });
    }
    return { ...state, items: updateItems };
  }

  if (
    action.type === "increment" ||
    action.type === "decrement" ||
    action.type === "update"
  ) {
    const updateItems = [...state.items];
    const existingCartItemIndex = updateItems.findIndex((item) =>
      item.id === undefined
        ? item.product.id === action.item.id
        : item.id === action.item.id
    );

    if (action.type === "increment") {
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updateItem = {
          ...existingItem,
          count: existingItem.count + 1,
        };        
        updateItems[existingCartItemIndex] = updateItem;
      }
    }
    if (action.type === "decrement") {
       
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem.count === 1) {
        updateItems.splice(existingCartItemIndex, 1);
      } else {
        const existingItem = state.items[existingCartItemIndex];
        const updateItem = {
          ...existingItem,
          count: existingItem.count - 1,
        };
        updateItems[existingCartItemIndex] = updateItem;
      }
    }

    state.items.map((product) =>
      mainFormHandlerTypeRaw({
        method: action.method,
        type: `${URL_CART}/${
          product.product === undefined ? product.id : product.product.id
        } `,
        count: product.count,
        token: action.token ,
      })
    );
    return { ...state, items: updateItems };
  }

  if (action.type === "REMOVE-ITEM") {    
    const updateItems = [...state.items];
    updateItems.splice(action.id , 1);

    return { ...state, items: updateItems };
  }

  if (action.type === "REMOVE-ALL") {
    mainFormHandlerTypeRaw({
      method: "REMOVE-ALL-CART-ITEM",
      type: `${URL_CART}`,
      token:  action.token ,
    });
    return { ...state, items: [] };
  }
  return state.items;
};

const CartContextProvider = ({ children }) => {
  const [token , setToken] = useState(JSON.parse( localStorage.getItem("token") ))
  const [cart , dispatchCartAction] = useReducer( handleProductReducer, {
    items: [],
  });
  const [cart_id , setCart_id] = useState()
  const [placeholder, setPlaceholder] = useState("");

  const notifySuccess = (text) => {
    toast.success(text);
  };

  const addProductToCart = async (item) => { 
   if( token!== null ){    
      let indexProduct = cart.items.findIndex((cartItem) =>
        cartItem.id === undefined
          ? cartItem.product.id === item.id
          : cartItem.id === item.id
      );
      
      dispatchCartAction({
        type: "Add-ITEM",
        item,
        token
      });
      if (indexProduct === -1) {
        notifySuccess("added successfully");
        return mainFormHandlerTypeRaw({
          method: "post",
          type: URL_CART,
          fromData: {productId:item.id},
          token: token ,
        });
      }else notifySuccess("The item is in the shopping cart.");
  }
    else notifySuccess("Please log in")
  };

  const updateProductInCart = useCallback((item, count, type, method) => {
    dispatchCartAction({
      item,
      count,
      type,
      method,
      token
    });
  } ,[token] )

  const removeSpecificCartItem = async (id) => {    
    setPlaceholder("placeholder");
    dispatchCartAction({
      type: "REMOVE-ITEM",
      id,
    });

    const data = await mainFormHandlerTypeRaw({
      method: "delete",
      type: `${URL_CART}/${id}`,
      token:  token,
    });
    
    if (data?.data?.status === "success") {      
      setPlaceholder("");
    }
  };

  const fetchCart = useCallback(async()=>{    
    const data = await mainFormHandlerTypeRaw({
      method:token !== null  ? 'get' : '',
      type: URL_CART,
      token:  token ,
    });    
    setCart_id(data)
    dispatchCartAction({
      type: "INIT_CART",
      item: data?.data?.data?.products || [],
    });
  }, [token])

  const clearUserCartProducts = () => {
    setPlaceholder("placeholder");
    setTimeout(() => {
      setPlaceholder("");
    }, 1000);
    dispatchCartAction({
      type: "REMOVE-ALL",
      token
    });
  };
  
  const cartCrx = {
    items: cart.items,
    addProductToCart,
    updateProductInCart,
    removeSpecificCartItem,
    clearUserCartProducts,
    fetchCart,
    placeholder,
    setToken ,
    token ,
    cart_id
  };

  return (
    <>
      <CartContext value={cartCrx}>{children}</CartContext>
    </>
  );
};

export default CartContextProvider;
