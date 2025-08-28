import React, {  useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CartContext } from "../../Store/CartContext";
import { totalPriceProduct } from "../../Logic/Logic";
import { totalPriceProducts } from "../../Logic/Logic";
import { totalCartItems } from "../../Logic/Logic";
import Button from "../../Components/Ui/Button";
import Style from "./Cart.module.css";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
const Cart = () => {
  const [beforeUnloadEvent, setBeforeUnloadEvent] = useState("");
  const [loading , setLoading] =useState(false)
  const {
    items,
    placeholder ,
    removeSpecificCartItem,
    updateProductInCart,
    clearUserCartProducts,
    fetchCart
  } = useContext(CartContext);

const totalCart = totalCartItems(items);
const oldTotal = useRef( totalCart )

if(!(oldTotal.current === totalCart)){
  oldTotal.current ="put"
}
else if (oldTotal.current === totalCart){
  oldTotal.current = totalCart
}

useEffect(()=>{
    setLoading(true)
    setTimeout( ()=>
      {setLoading(false)} , [1000])
} , [])
  useEffect(() => {
    return () => {      
      const callUpdateProductInCart = (type, method) => {
        updateProductInCart("", "", type, method);
      };  
        callUpdateProductInCart("update", oldTotal.current);
        setTimeout(()=>{
        fetchCart()    
      } , callUpdateProductInCart)
     } 
  },  [ updateProductInCart , fetchCart , loading ]);

  useEffect(() => {
    if (
      beforeUnloadEvent === "increment" ||
      beforeUnloadEvent === "decrement"
    ) {
      const unloadCallback = (event) => {
        event.preventDefault();
      };
      window.addEventListener("beforeunload", unloadCallback);
      return () => window.removeEventListener("beforeunload", unloadCallback);
    }
  }, [beforeUnloadEvent]);
    
 if(!loading){
  
  return (
    <div className={`${Style.cartCover}`}>
      <Container>
        <Row>
          <Col md={9} className={`mt-5 mb-5 bg-light ${placeholder} ${Style.empty}`}>
            <h3 className="h3 mt-2">my cart ({totalCart})</h3>
            <hr className="w-100"/>
            <div
              className={`${Style.cartItems} d-flex flex-wrap justify-content-between align-items-center w-100`}
            >
              
              {(items.message !== "success") &&( items.length !== 0 )? (
                items?.map((product) => {
                  const notFound = product.product === undefined;

                  return (
                    <CartItems
                      product={product}
                      updateProductInCart={updateProductInCart}
                      setBeforeUnloadEvent={setBeforeUnloadEvent}
                      totalPriceProduct={totalPriceProduct}
                      removeSpecificCartItem={removeSpecificCartItem}
                      key={notFound ? product.id : product.product.id}
                    />
                  );
                })
              ) : (
                <h4 className="mt-5 m-auto"> cart is empty </h4>
              )}

            </div>
            {items.length !== 0 && (
                <Button
                  className={`${Style.clearAllBtn} p-1 pe-4 ps-4 mx-3 my-3 border`}
                  onClick={clearUserCartProducts}
                >
                  clear all
                </Button>
              )}
          </Col>
          <Col md={3} className="mt-5 mb-5">
            <div className={`${Style.OrderSummary} bg-light p-2`}>
              <h6>Order summary</h6>
              <hr className="w-100" />
              <ul className="d-flex flex-wrap justify-content-between">
                <li>Subtotal</li>
                <li> ${totalPriceProducts(items)}</li>
              </ul>
              <h6>Estimate Delivery</h6>
              <hr className="w-100" />
              <ul className="d-flex flex-wrap justify-content-between">
                <li>Total</li>
                <li>${totalPriceProducts(items)}</li>
              </ul>
             
              <Link to={"../checkout"}>  
               <button  disabled={items.length===0 ? true : false }  className={"checkout-btn"} to={"../checkout"}>
                check out 
               </button> </Link>
          
              <h6 className="text-center mt-2">Secure Checkout</h6>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
} else return <Loading/>
};

export default Cart;
