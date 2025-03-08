export interface FixedAsset {
    Id: number;
    month: string;
    FADescription: string;
    percentage: number;
    purchasedMonth: string;
    // valueInMoney: number;    
    unitCost: number;
    UnitsPerchased: number;
    SelectedCategory: number;
    CategoryInPercentage: number;
  }

  export interface IFixedAssetModal {
    UserId: number;
    FixedAssets: FixedAsset[];
  }