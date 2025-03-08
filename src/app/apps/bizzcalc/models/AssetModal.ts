export interface FixedAsset {
    FADescription: string;
    FACost: number;
    FAMonth: string;
    FAYear: string;
    FADate: string;
    FACat: number;
  }
  
  export interface IFixedAssetModalOld {
    UserId: number;
    FixedAssets: FixedAsset[];
  }
  