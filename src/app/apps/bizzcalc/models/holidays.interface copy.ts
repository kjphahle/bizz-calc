export interface IHolidayResponse {
  Day1: number
  Day2: number
  Day3: number
  Day4: number
  Day5: number
  Day6: number
  Day7: number
  Holiday: IHoliday[]
  WorkDaysForecast: number
}

export interface IHoliday {
  HolidayName: string
  DateStart: string
  DateEnd: string
  PageNumber: string
}
