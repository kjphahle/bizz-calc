export interface Expense {
  Id: number;
  expenseName: string;
  expenseBaseValue: string;
  baseRateReviewMonth: string;
  baseRateReviewValue: string;
}

export interface Expense2 {
  GLID: number;
  Allocation: string;
  Adjustment: string;
  AdjustmentMonth: string;
}
