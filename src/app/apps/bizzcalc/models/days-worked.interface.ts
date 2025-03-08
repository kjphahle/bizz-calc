export interface IDaysWorked {
  UserID: string;
  Day1: boolean;
  Day2: boolean;
  Day3: boolean;
  Day4: boolean;
  Day5: boolean;
  Day6: boolean;
  Day7: boolean;
  Holidays: IHoliday[];
  WorkDaysForecast: number;
}

export interface IHoliday {
  HolidayName: string;
  DateStart?: string;
  HolidayStartDt?: string;
  HolidayEndDt?: string;
  DateEnd?: string;
  PageNumber: string;
}
