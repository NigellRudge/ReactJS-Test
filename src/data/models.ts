export interface Product {
    name:string,
    price:number,
    image:string,
    rating:number
    description:string
}

export interface Item {
    id:number,
    product: Product,
    amount:number
}

export enum ActionTypes {
    INCREMENT,
    DECREMENT,
    CHANGE_SHIPPING
}

export enum ShippingMethod {
    NORMAL,
    EXPRESS,
    PICK_UP
}

export interface Shipping {
    id:number,
    name:string,
    price:number
}

export interface StateType {
    shippingMethod:Shipping
    cart: Item[]
}

export interface Action {
    type:ActionTypes,
    payload: number|ShippingMethod
}

export function createIncrement(id:number):Action{
    return {
        type:ActionTypes.INCREMENT,
        payload:id
    }
}

export function createDecrement(id:number):Action{
    return {
        type:ActionTypes.DECREMENT,
        payload:id
    }
}

export function createChangeShippingMethod(shippingMethod:ShippingMethod):Action{
    return {
        type:ActionTypes.CHANGE_SHIPPING,
        payload:shippingMethod
    }
}
