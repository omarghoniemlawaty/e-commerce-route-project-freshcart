export const totalPriceProduct=(price , count)=>{
    return (price * count).toFixed(2)
}
export const totalPriceProducts=(item)=>{
    return item.reduce((total , item)=>{
       return ( total + (item.price * item.count))
   },0).toFixed(2) 
}
export const totalCartItems = (items)=>items.reduce((totalNumberOfItems, CartItem) => {
    return ( totalNumberOfItems + CartItem.count );
  }, 0);
  
