import { ItemDiscount } from "./discounts/ItemDiscount";
import { PercentDiscount } from "./discounts/PercentageDiscount";
import { Item } from "./Item";

class Basket {
    promoRules: Array<ItemDiscount | PercentDiscount>;
    productPrices: Map<string, number>;
    constructor(promoRules: Array<ItemDiscount | PercentDiscount>, { products = null } : { products: Array<Item>}) {
        this.promoRules = promoRules;
        this.productPrices = this.products_with_prices(products);
    }

    product_prices(): Map<string, number> {
        return this.productPrices;
    }

    promo_rules(): Array<ItemDiscount | PercentDiscount> {
        return this.promoRules;
    }

    cost_for_item(item: string, num: number): number {
        return this.productPrices.get(item) * num;
    }

    products_with_prices(products: Array<Item>): Map<string, number>  {
        let productsMap = new Map();
        products.map(product => productsMap.set(product.codeNumber, product.priceGiven));
        return productsMap
    }

    sum_without_discounts(order: Map<string, number>): number {
       let sum = 0;
       order.forEach((value, key) => sum+=this.cost_for_item(key, value))
       return sum;
    }

    apply_discounts(cost_before_discounts: number, order: Map<string, number>): number {
        return this.promoRules.reduce(((current_total, rule) => current_total - rule.apply(current_total, order)), cost_before_discounts);
    }

    total(order: Map<string, number>): number {
        return this.apply_discounts(this.sum_without_discounts(order), order);
    }
}

export { Basket };