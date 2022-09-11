import {Action, ActionTypes, Product, Shipping, ShippingMethod, StateType} from "./models";
import {PRODUCT_PRICE} from "../utils/config";
import {incrementDecrementCartItem} from "../utils";
import switchImg from '../assets/switch.jpg';
import xboxImg from '../assets/xbox.jpg';
import ps5Img from '../assets/ps5.jpg';
import { getShippingByMethod } from '../utils/index';

export const SHIPPING_OPTIONS: Shipping[] = [
    {id:ShippingMethod.EXPRESS, name:'Express Shipping', price:9.99},
    {id:ShippingMethod.PICK_UP, name:'Pickup', price:0.0},
    {id:ShippingMethod.NORMAL, name:'Normal', price:4.99}
]

const products: Product[] =[
    {name:'Sony Playstation 5',
        price: PRODUCT_PRICE,
        rating:4.7,
        image:ps5Img,
        description:' Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, ' +
            'adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.'},

    {name:'Xbox series X',
        price: PRODUCT_PRICE,
        image:xboxImg,
        rating:4.1,
        description:'Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four ' +
            'Generations of Consoles - all games look and play best on Xbox Series X.'},

    {name:'Nintendo Switch Oled',
        price: PRODUCT_PRICE,
        rating:4.8,
        image:switchImg,
        description:' Play anytime, anywhere, with anyone. ' +
            'Nintendo Switch can transform to suit your situation, so you can play the games you want, no matter how busy life may be.'},

]

const initialState:StateType = {
    shippingMethod:SHIPPING_OPTIONS[1],
    cart:[
        {id:1,product:products[0],amount:1},
        {id:2,product:products[1],amount:3},
        {id:3,product:products[2],amount:1},
    ]
}

export function cartReducer(state:StateType=initialState, action:Action){
    switch (action.type) {
        case ActionTypes.DECREMENT:{
            let temp = incrementDecrementCartItem(state.cart,action.payload,false);
            return {...state,cart: temp};
        }
        case ActionTypes.INCREMENT:{
            let temp = incrementDecrementCartItem(state.cart,action.payload,true);
            return {...state,cart:temp};
        }
        case ActionTypes.CHANGE_SHIPPING:{
            return {...state,shippingMethod:getShippingByMethod(action.payload as ShippingMethod)};
        }
        default:{
            return state;
        }
    }
}


