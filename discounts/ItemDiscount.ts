class ItemDiscount {
    _item_code: string;
    _min_items: number;
    _discount_amount: number;
    constructor(item_code: string, min_items: number, discount: number) {
      this._item_code = item_code;
      this._min_items = min_items;
      this._discount_amount = discount;
    };
  
    apply(current_total: number, order: Map<string, number>): number {
      if (this.should_discount_be_applied(order)) {
        return this.apply_discount(order);
      } else {
        return 0;
      }
    };
  
    should_discount_be_applied(order: Map<string, number>): boolean {
      return order.get(this._item_code) >= this._min_items;
    };
  
    apply_discount(order: Map<string, number>): number {
      return order.get(this._item_code) * this._discount_amount;
    }
}

export { ItemDiscount };