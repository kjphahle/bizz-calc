import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBusinessDetails } from '../models/business-details.interface';
import { IDaysWorked } from '../models/days-worked.interface';
import {
  ICategoryDepreciationRate,
  IFixedAssets,
} from '../models/fixed-assets.interface';
import { IDepreciationRate } from '../models/depreciation-rate.interface';
import { IRevenueCalculator } from '../models/revenue-calculator';
import { IEmployeeModal } from '../models/EmployeeModal';
import { IExpenseModal } from '../models/ExpenseModal';
import { IFundingCalculatorModal2 } from '../models/FundingCalculatorModal2';
import { IFixedAssetModal } from '../models/FixedAsset';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BizzCalcService {
  //
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    apiKey: 'G37BF2948D54BB2A5CEF4D1BD3F3CA3123', // TODO: read  token from session storage
    // token: '52744684194521768712', // TODO: read  token from session storage
  });

  private businessDetails = new Subject<IBusinessDetails>();
  public businessDetails$ = this.businessDetails.asObservable();

  private scenarioStartDate = new Subject<Date>();
  public setUpStartDate: Date = new Date();
  public scenarioStartDate$ = this.scenarioStartDate.asObservable();

  private scenarioName = new BehaviorSubject<string>('LEARN');
  public scenarioName$ = this.scenarioName.asObservable();

  private daysWorked = new Subject<IDaysWorked>();
  public daysWorked$ = this.daysWorked.asObservable();

  setUpdMonths = [
    {
      month: 'jan',
      monthNo: 1,
    },
    {
      month: 'feb',
      monthNo: 2,
    },
    {
      month: 'mar',
      monthNo: 3,
    },
    {
      month: 'apr',
      monthNo: 4,
    },
    {
      month: 'may',
      monthNo: 5,
    },
    {
      month: 'jun',
      monthNo: 6,
    },
    {
      month: 'jul',
      monthNo: 7,
    },
    {
      month: 'aug',
      monthNo: 8,
    },
    {
      month: 'sep',
      monthNo: 9,
    },
    {
      month: 'oct',
      monthNo: 10,
    },
    {
      month: 'nov',
      monthNo: 11,
    },
    {
      month: 'dec',
      monthNo: 12,
    },
  ];

  public apiUrl = environment.asoneGlobalUrl;
  // public userId;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    // this.userId = 82335;
  }

  // public setScenarioStartDate(startDate: Date): void {
  //   // this.scenarioStartDate.next(startDate);
  //   // this.setUpStartDate = startDate;
  // }

  public getReports(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}BBReports`, {
      headers,
    });
  }

  public getBusinessDays(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}BBholidays`, {
      headers,
    });
  }


  public getBizzCalcReport(reportId: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}BBReport/${reportId}`, {
      headers,
    });
  }


  businessStartMonth = signal(1);
  reviewMonth = signal(1);

  setBusinessStartMonth(startMonth: number) {
    this.businessStartMonth.set(startMonth);
  }

  setReviewMonth(reviewMonth: number) {
    this.reviewMonth.set(reviewMonth);
  }

  public getMonthNumber(): number {
    const monthNumber = this.setUpStartDate.getMonth();
    return monthNumber + 1;
  }

  public configureMonthsArray(startingMonth) {
    let combinedList = [];
    const adjustedMonthsArray = [...this.setUpdMonths];
    const startIndex = adjustedMonthsArray.findIndex(
      (month) => month.monthNo === startingMonth
    );

    if (startIndex !== -1) {
      const adjustedMonths = adjustedMonthsArray.splice(startIndex);
      const firstList = adjustedMonths.map((month, index) => ({
        ...month,
        monthNo: index + 1,
      }));
      combinedList = [...firstList];
      for (const month of adjustedMonthsArray) {
        combinedList.push({
          month: month.month,
          monthNo: month.monthNo + firstList.length,
        });
      }
      console.log(combinedList);
    }
    return combinedList;
  }

  public setScenarioName(name: string): void {
    this.scenarioName.next(name);
  }

  //revenue calculator
  public GetRevenue(id: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}BBrevcal/${id}`, {
      headers,
    });
  }
  // public PostRevenue(revenue: any): Observable<any> {
  //   const headers = this.headers;
  //   return this.http.post<any>(`${this.apiUrl}BBrevcal`, revenue, {
  //     headers,
  //   });
  // }

  public PostRevenue(revenue: IRevenueCalculator): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBrevcalc1`, revenue, {
      headers,
    });
  }

  //Employment
  public GetEmployment(id: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}BBemployment/${id}`, {
      headers,
    });
  }

  public PostEmployee(employee: IEmployeeModal): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBemployment1`, employee, {
      headers,
    });
  }

  public PostEmployees(employee: any): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBemployment1`, employee, {
      headers,
    });
  }

  showToastMessage(
    severity: string,
    title: string,
    details: string,
    life: number = 3000
  ) {
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: details,
      key: 'br',
      life: life,
      styleClass: 'test',
    });
  }

  //Operational Assets
  public GetOperatingExpense(id: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}BBexpenses/${id}`, {
      headers,
    });
  }

  public GetItemPerCatList(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}GetItemsPerCatList`, {
      headers,
    });
  }
  public PostOperatingExpense(operatingExpense: any): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBexpenses1`, operatingExpense, {
      headers,
    });
  }

  //Fixed Assets
  public GetFixedAssets(id: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}GetAssets/${id}`, {
      headers,
    });
  }

  public PostFixedAssets(fixedAsset: IFixedAssetModal): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBassets1`, fixedAsset, {
      headers,
    });
  }

  //Funding Calculator
  public GetFundingCalculator(id: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}BBfuncalc2/${id}`, {
      headers,
    });
  }

  public PostFundingCalculator(
    fundingCalculator: IFundingCalculatorModal2
  ): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBfuncalc1`, fundingCalculator, {
      headers,
    });
  }

  public createBusinessDetails(businessDetails: any): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBPostSetup1`, businessDetails, {
      headers,
    });
  }

  public createFixedAssets(fixedAssets: any): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBassets1`, fixedAssets, {
      headers,
    });
  }

  public getBusinessDetails(): Observable<IBusinessDetails> {
    const headers = this.headers;
    return this.http
      .get<any>(`${this.apiUrl}BBGetSetup1`, {
        headers,
      })
      .pipe(
        map((response) => {
          const businessDetails: IBusinessDetails = response.children[0];
          this.businessDetails.next(businessDetails);
          return businessDetails;
        })
      );
  }

  public getFixedAssetsList(): Observable<IFixedAssets[]> {
    const headers = this.headers;
    let params = new HttpParams();
    params = params.append('code', 'A');
    return this.http
      .get<any>(`${this.apiUrl}GetCOAConsLevelList`, {
        params,
        headers,
      })
      .pipe(
        map((response) => {
          const fixedAssets: IFixedAssets[] = response.children;
          return fixedAssets;
        })
      );
  }

  public getDepreciationRates(): Observable<ICategoryDepreciationRate[]> {
    const headers = this.headers;
    return this.http
      .get<any>(`${this.apiUrl}BBdepreciationrates`, {
        headers,
      })
      .pipe(
        map((response) => {
          return response.children;
        })
      );
  }

  public getExpensesList(): Observable<IFixedAssets[]> {
    const headers = this.headers;
    let params = new HttpParams();
    params = params.append('code', 'E');
    return this.http
      .get<any>(`${this.apiUrl}GetCOAConsLevelList`, {
        params,
        headers,
      })
      .pipe(
        map((response) => {
          const fixedAssets: IFixedAssets[] = response.children;
          return fixedAssets;
        })
      );
  }

  // Get days worked
  public getDaysWorked(): Observable<IDaysWorked> {
    const headers = this.headers;
    return this.http
      .get<any>(`${this.apiUrl}BBsetup2`, {
        headers,
      })
      .pipe(
        map((response) => {
          const daysWorked: IDaysWorked = response.children[0];
          this.daysWorked.next(daysWorked);
          return daysWorked;
        })
      );
  }

  public getHolidays(): Observable<IDaysWorked> {
    const headers = this.headers;
    return this.http
      .get<any>(`${this.apiUrl}BBholidays`, {
        headers,
      })
      .pipe(
        map((daysWorked) => {
          return daysWorked;
        })
      );
  }

  // Create days worked
  public createDaysWorked(daysWorked: IDaysWorked): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}BBsetup2`, daysWorked, {
      headers,
    });
  }

  public createDepreciationAsset(
    depreciationrates: IDepreciationRate[]
  ): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(
      `${this.apiUrl}BBdepreciationrates`,
      { DepreciationRates: depreciationrates },
      {
        headers,
      }
    );
  }
}
