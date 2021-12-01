class PercentDiscount {
    _percent_discount: number;
    _threshold: number;
    constructor(percent_discount: number, threshold: number ) {
      this._percent_discount = percent_discount;
      this._threshold = threshold;
    };
  
    apply(current_total: number, order: Map<string, number>): number {
      if (this.should_discount_be_applied(current_total)) {
        return this.apply_discount(current_total);
      } else {
        return 0;
      }
    };
  
    should_discount_be_applied(current_total: number): boolean {
      return current_total > this._threshold;
    };
  
    apply_discount(current_total: number): number {
      return current_total * this._percent_discount / 100;
    }
}

export { PercentDiscount };