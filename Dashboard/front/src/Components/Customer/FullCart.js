import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "./CartCard";
import { increaseItemQuant , decreaseItemQuant, changeCartTotal} from "../../Store/action";
import { useEffect, useState } from "react";
import Cart from "./Cart";


export default function FullCart(){
    const cart=useSelector((state)=>state.cartItems)
    const cartTotal=useSelector((state)=>state.cartTotal)
    
    const dispatcher=useDispatch()
  
    function increaseItems(item){
        dispatcher(increaseItemQuant(item.id))
        dispatcher(changeCartTotal(item.cost))
    }
    function decreaseItems(item){
        dispatcher(decreaseItemQuant(item.id))
        dispatcher(changeCartTotal(-item.cost))

    } 
    return(
        <>
        <div className="h-[calc(100vh-200px)] lg:h-[calc(100vh-220px)] thin-scrolling overflow-y-auto p-4 relative">
        {cart.map((item, index) => (
            <CartCard
                key={index} 
                src={item.image}
                title={item.name}
                // description={item.description}
                price={item.cost}
                quant={item.quant} 
                increase={()=>increaseItems(item)}
                decrease={()=>decreaseItems(item)}
            />
           

))}
 </div>

        </>
    )
}
