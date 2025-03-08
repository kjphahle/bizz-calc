export interface ExpenseModal {
    expenseitem: number;
    expenseName: string;
    expenseDate: string;
    expChngPerc: string;
    expMthRt: string;
    PageNumber: number;
  }
  
  export interface IExpenseModal {
    UserId: number;
    Expenses: ExpenseModal[];
  }
  