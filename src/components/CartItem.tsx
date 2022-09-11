import React from "react";
import {formatNumber, limitString} from "../utils";
import {createDecrement, createIncrement, Item} from "../data/models";
import {useDispatch} from "react-redux";

interface IProps {
    item: Item
}

const CartItem = ({item}:IProps)=>{
    const dispatch = useDispatch();
    const Increment = ()=>{
        dispatch(createIncrement(item.id))
    }
    const Decrement = ()=>{
        dispatch(createDecrement(item.id))
    }
    return (
        <div className='bg-white border-gray-50 border-2 shadow-gray-200 rounded h-36 w-full mb-2 flex flex-row shadow-sm'>
            <div className='flex h-full w-48 '>
                <img alt="cart item" src={item.product.image} className="h-full w-full object-cover" />
            </div>
            <div className='flex flex-col p-2'>
                <div className='flex flex-row'>
                    <span className='text-xl font-bold text-gray-600'>{item.product.name}</span>
                    <div className='flex flex row mx-2 items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mx-1 text-yellow-400">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className='text-gray-400 font-semibold text-sm'>
                        {item.product.rating}
                    </span>
                    </div>

                </div>

                <span className='text-base text-gray-500'>
                                {limitString(item.product.description)}
                            </span>
                <div className='flex my-2 items-center justify-center'>
                    <div className='flex flex-row p-2 items-center justify-center rounded-xl bg-indigo-300 w-28 h-8'>
                        <div className='flex flex-row items-center justify-center flex-1'>
                            <button className='text-white w-full h-full text-2xl' onClick={Increment}>
                                +
                            </button>
                        </div>
                        <span className='flex items-center justify-center bg-white border-indigo-300 flex-1'>{item.amount}</span>
                        <div className='flex items-center justify-center flex-1'>
                            <button className='text-white w-full h-full text-2xl' onClick={Decrement}>
                                -
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex flex-col items-center justify-center w-32'>
                <div className='flex flex-row'>
                    <span className='text-sm font-semibold text-gray-600'>
                        {item.amount} x
                        <span className='text-gray-400 mx-1'>
                            {formatNumber(item.product.price)}
                        </span>

                    </span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-2xl font-semibold text-green-600'>{formatNumber(item.product.price * item.amount).slice(0,1)}</span>
                    <span className='text-2xl font-semibold text-gray-600'>{formatNumber(item.product.price * item.amount).slice(1)}</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
