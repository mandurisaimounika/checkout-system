import { Basket } from "./Basket";
import { ItemDiscount } from "./discounts/ItemDiscount";
import { PercentDiscount } from "./discounts/PercentageDiscount";
import { Item } from "./Item";

class Checkout {
    _products: Array<Item>;
    _basket: Basket;
    _order: Map<any, any>;
    constructor(promotional_rules: Array<ItemDiscount | PercentDiscount> = null, { products = null } : {products: Array<Item>}) {
      this._products = products;
      this._basket = new Basket(promotional_rules, {products});
      this._order = this.setObject();
    };

    setObject(): Map<string, number> {
      let obj = new Map();
      this._products.forEach(product => {
         obj.set(product.codeNumber, 0);
      });
      return obj;
    }
  
    scan(item_code: string): void {
      if (!this.item_in_products(item_code)) {
        throw new Error(`${item_code} is not a valid item code`)
      };
  
      this._order.set(item_code, this._order.get(item_code)+1)
    };
  
    getTotal(): string {
      return `${this.order_cost_in_pounds} €`;
    };
  
    getProducts(): Array<Item> {
      return this._products
    };
  
    getBasket(): Basket {
      return this._basket
    };
  
    getOrder(): Map<string, number> {
      return this._order
    };
  
    get order_cost_in_pounds(): number {
      let total = this._basket.total(this._order) / 100 ;
      return Math.round(total * 100) / 100;
    };
  
    item_in_products(item_code: string): boolean {
      return this._products.map(product => product.codeNumber).includes(item_code)
    }
}

export { Checkout };