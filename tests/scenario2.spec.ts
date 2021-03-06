import { Checkout } from "../Checkout";
import { ItemDiscount } from "../discounts/ItemDiscount";
import { PercentDiscount } from "../discounts/PercentageDiscount";
import { Item } from "../Item";

describe('test case for 002-001-002', () => {
    it('should get the total price 9.93€', () => {
        let item01 = new Item('001','Curry Sause', 195);
        let item02 = new Item('002', 'Pizza', 599);
        let item03 = new Item('003','Mens T-shirt', 2500);
        
        let products = [item01, item02, item03];
        
        let ten_percent_discount = new PercentDiscount(10, 3000);
        
        let pizza_discount = new ItemDiscount("002", 2, 200);
        
        let pricing_rules = [pizza_discount, ten_percent_discount];
        
        let checkout = new Checkout(pricing_rules, { products: products });
        
        checkout.scan('002');
        checkout.scan('001');
        checkout.scan('002');

        let totalPrice = '9.93 €';
        expect(checkout.getTotal()).toStrictEqual(totalPrice);
    })
})
