import React from 'react';
import {
    calculatePercentageAmount,
    calculateSubTotal,
    calculateTotal,
    calculateTotItemsInCart,
    formatNumber
} from "../utils";
import {DISCOUNT_PERCENTAGE, TAX_PERCENTAGE} from "../utils/config";
import {useDispatch, useSelector} from "react-redux";
import {createChangeShippingMethod, ShippingMethod, StateType} from "../data/models";
import { SHIPPING_OPTIONS } from '../data/reducer';




const Total = ()=>{
    const dispatch = useDispatch();
    const cart = useSelector((state:StateType)=>{
        return state.cart
    })
    const shippingMethod = useSelector((state:StateType)=>{
        return state.shippingMethod
    })
    const changeShippingMethod = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        console.log(event.target.value)
        dispatch(createChangeShippingMethod(parseInt(event.target.value) as ShippingMethod))
    }
    return (
        <div className='flex flex-col p-2s w-2/6 h-full bg-white border-l-gray-100 border-l-2'>
            <div className='flex flex-col h-3/5 p-4'>
                <div className='border-b-2 py-2 px-4 border-b-gray-300'>
                    <span className='text-xl font-semibold text-gray-600'> Order Summary</span>
                </div>
                <div className='flex flex-col px-4 py-2 0'>
                    <div className='flex flex-row justify-between mb-1'>
                        <span>{calculateTotItemsInCart(cart)} items</span>
                        <span>+ {calculateTotal(cart)}</span>
                    </div>
                    <div className='flex flex-row justify-between mb-1'>
                        <span>Total tax</span>
                        <span>+ {calculatePercentageAmount(cart,TAX_PERCENTAGE)}</span>
                    </div>
                    <div className='flex flex-row justify-between mb-1'>
                        <span>Shipping: {shippingMethod.name}</span>
                        <span>+ {formatNumber(shippingMethod.price)}</span>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <span>Discount: {DISCOUNT_PERCENTAGE}%</span>
                        <span className='text-red-400'>- {calculatePercentageAmount(cart, DISCOUNT_PERCENTAGE)}</span>
                    </div>
                    <div className='flex flex-row justify-between my-2 w-full border-b-2 border-b-gray-30'>
                    </div>
                    <div className='flex flex-row justify-between mb-1'>
                        <span>Subtotal</span>
                        <span>+ {calculateSubTotal(cart,shippingMethod)}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col row justify-center h-1/5 px-4 w-full'>
                <span className='text-lg mb-2 text-gray-500 text-bold'>
                    Select shipping method
                </span>
                <select defaultValue={shippingMethod.id} className='w-full h-12 bg-white border-2 border-gray-100 p-2' onChange={changeShippingMethod} >
                    {SHIPPING_OPTIONS.map((element,index)=>{
                        return <option key={index} className='px-2 py-1 text-lg text-gray-600 hover:bg-indigo-400' value={element.id}>{element.name}</option>
                    })}
                </select>
            </div>
            <div className='flex flex-col h-1/5 items-center justify-center'>
                <button onClick={()=> alert('Preceded to checkout')} className='bg-indigo-400 font-bold text-white w-64 h-16 rounded-xl lg p-4'>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default  Total;
