import React from 'react'
import CartItem from "./CartItem";
import {useSelector} from "react-redux";
import {StateType} from "../data/models";

const Cart = ()=>{
    const items = useSelector((state:StateType)=>{
        return state.cart;
    })
    return(
        <div className="flex flex-col w-4/6 p-2">
            {items.map((element,index)=>{
                return <CartItem item={element} key={element.id} />
            })}
        </div>
    )
}

export default Cart;
