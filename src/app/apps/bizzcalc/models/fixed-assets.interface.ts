export interface IFixedAssets {
  ID: number;
  GLCode: string;
  GLDescription: string;
}

export interface ICategoryDepreciationRate {
  ID: number;
  CategoryID: number;
  DepreciationRate: number;
}
