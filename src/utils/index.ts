import { Item, ShippingMethod, Shipping } from '../data/models';
import {DISCOUNT_PERCENTAGE, MAX_PRODUCT_COUNT, MIN_PRODUCT_COUNT, TAX_PERCENTAGE} from "./config";
import { SHIPPING_OPTIONS } from '../data/reducer';

export function incrementDecrementCartItem(cart:Item[],itemId:number,increment:boolean):Item[]{
    let item = cart.filter((element)=>{
        return element.id === itemId
    })[0]
    let itemIndex = cart.indexOf(item);
    if(increment){
        item = item.amount + 1 > MAX_PRODUCT_COUNT ? item : {...item,amount: item.amount+1};
    }
    else{
        item = item.amount - 1 < MIN_PRODUCT_COUNT ? item : {...item,amount: item.amount+-1};
    }

    cart[itemIndex] = item;
    return [...cart];
}


export function limitString(inputString:string,limit:number=130):string{
    return inputString.slice(0,limit)+ '...';
}

export function calculateTotal(cart:Item[]):string{
    return  formatNumber(BigInt(getCartTotal(cart)));
}

function getCartTotal(cart:Item[]):number{
    let total = 0;
    for(let item of cart){
        let temp = item.amount * item.product.price
        total = total + temp;
    }
    return total;
}
export function formatNumber(inputNumber:number|bigint):string{
    return new Intl.NumberFormat('nl-NL',{style: 'currency', currency: 'EUR'}).format(inputNumber)
}

export function calculatePercentageAmount(cart:Item[], percentage:number):string{
    let temp = (getCartTotal(cart) / 100) * percentage;
    return formatNumber(parseFloat(temp.toPrecision(2)));
}

export function calculateSubTotal(cart:Item[], ShippingMethod:Shipping):string {
    let totalItemCost = parseFloat(getCartTotal(cart).toPrecision(2));
    let tax = parseFloat(((totalItemCost / 100 ) * TAX_PERCENTAGE).toPrecision(2));
    let shippingCost = ShippingMethod.price;
    let discount = parseFloat(((totalItemCost / 100 ) * DISCOUNT_PERCENTAGE).toPrecision(2));
    let subTotal = totalItemCost + tax + shippingCost - discount;
    return formatNumber(subTotal);
}

export function calculateTotItemsInCart(cart:Item[]):number{
    let total = 0;
    for(let item of cart){
        total = total + item.amount;
    }
    return total;
}

export function getShippingByMethod(method:ShippingMethod):Shipping{
    let temp = SHIPPING_OPTIONS.filter((element)=>{
        return element.id === method
    })[0];
    return {...temp};
}