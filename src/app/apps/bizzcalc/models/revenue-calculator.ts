export interface AdjustmentMonth {
    adjustmentMonth: string;
    growthRate: number | null;
  }

  export interface IRevenueCalculator {
    UserId?: number;
    ValueSalesPerDay: string;
    ProfitMargin: number;
    GrowthRate: string;
    AdjustmentMonths: AdjustmentMonth[];
  }
