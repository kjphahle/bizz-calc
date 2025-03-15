import { Component, OnInit } from '@angular/core';
import {
  faCalculator,
  faArrowCircleLeft,
  faArrowAltCircleRight,
  faCalendar,
  faCamera,
  faChartLine,
  faCoins,
  faGear,
  faPencilAlt,
  faScroll,
  faTruck,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BizzCalcTabs } from 'src/app/enums/apps/bizzcalc/bizzcalcTabs.enum';
import { Employee } from '../bizzcalc/models/Employee';
import { Expense } from '../bizzcalc/models/Expense';
import { FundingCalculator } from './models/FundingCalculator';
import { IncomeStatement } from '../bizzcalc/models/IncomeStatement';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FixedAsset, IFixedAssetModal } from './models/FixedAsset';
import { BizzCalcService } from './services/bizz-calc.service';
import { IFundingCalculatorModal2 } from './models/FundingCalculatorModal2';
import { IRevenueCalculator } from './models/revenue-calculator';
import { EmployeeModel, IEmployeeModal } from './models/EmployeeModal';
import { ExpenseModal, IExpenseModal } from './models/ExpenseModal';

@Component({
    selector: 'app-bizzcalc',
    templateUrl: './bizzcalc.component.html',
    styleUrls: ['./bizzcalc.component.scss'],
    standalone: false
})
export class BizzcalcComponent implements OnInit {
  revenueCalculator: IRevenueCalculator = {
    UserId: 82452,
    ValueSalesPerDay: null,
    ProfitMargin: null,
    GrowthRate: 'Year 1',
    AdjustmentMonths: [],
  };

  fixedAsset: FixedAsset = {
    Id: 1,
    FADescription: null,
    month: 'Jan',
    purchasedMonth: 'month 1 - jan',
    percentage: null,
    // valueInMoney: null,
    unitCost: null,
    UnitsPerchased: null,
    SelectedCategory: null,
    CategoryInPercentage: null,
  };
  //FixedAsset

  fundingCalculator: IFundingCalculatorModal2 = {
    UserId: 82452,
    Floats: 0,
    Deposits: 0,
    PettyCash: 0,
    InventoryDays: 0,
    ReceivablesDays: 0,
    PayablesDays: 0,
  };
  //Employment details
  employee: Employee = {
    Id: 1,
    employmentMonth: 'month 1 - jan',
    jobTitle: '',
    employmentMonths: 0,
    employeeRate: '0.00',
    employmentGrowthRate: 'month 1 - feb',
    employeeGrowthRate: '0.00%',
  }; //{
  //as Employee;
  expense: Expense = {
    Id: 1,
    expenseName: 'Accounting Expense',
    expenseBaseValue: '0,00',
    baseRateReviewMonth: 'month 2 - mar',
    baseRateReviewValue: '0.00%',
  }; //{} as Expense;
  employees: Employee[] = [];
  expenses: Expense[] = [];
  fixedAssets: FixedAsset[] = [];

  selectedItem: any;
  // Create an array of IncomeStatement instances
  incomeStatements: any;
  // Create a new instance of IncomeStatement with default values
  defaultIncomeStatement: IncomeStatement = {
    id: 1,
    revenue: 2000000,
    costOfSales: 2000000,
    groupProfit: 2000000,
    operatingExpenses: 2000000,
    netOperatingProfit: 2000000,
  };
  scheduleOfExpenses = [];
  balanceSheet = [];

  public onAddJobTitle(): void {
  }

  saveFundingCalculator(fundingCalculator: IFundingCalculatorModal2) {
    this.bizzCalcService
      .PostFundingCalculator(fundingCalculator as any)
      .subscribe(
        (response) => {
          // this.fundingCalculator = {

          //   DaysInventory: null,
          //   DaysReceivables: null,
          //   DaysPayables: null,
          //   CashFloat: null,
          //   Deposits: null,
          //   PettyCash: null,
          // };
          console.log('Funding calculator saved', response);
        },
        (error) => {
          console.error('Error saving funding calculator', error);
        }
      );
  }

  openDeleteModal(employee: any, content: any) {
    this.selectedItem = employee;
    this.selectedItem.type = employee?.jobTitle ? 'employee' : 'expense';
    this.modalService.open(content);
  }

  deleteEmployee() {
    const index = this.employees.findIndex(
      (employee) => employee.Id === this.selectedItem?.Id
    );
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
    this.modalService.dismissAll();
    this.selectedItem = {};
  }

  saveEmployee() {
    // Access the input data and perform your desired actions
    const idExists = this.employees.some(
      (employee) => employee.Id === this.employee.Id
    );
    if (idExists) {
      console.log('Employee with the same ID already exists');
      this.employee = {} as Employee;
      return;
    }
    let IdCounter = this.employees.length + 1;
    this.employee.Id = IdCounter;
    this.employees.push(this.employee);
    console.log(this.employee);
    this.employee = {} as Employee;
    // Add your logic to save the data or perform any other operations
  }
  saveExpense() {
    // Access the input data and perform your desired actions
    const idExists = this.expenses.some(
      (expense) => expense.Id === this.expense.Id
    );
    if (idExists) {
      console.log('Expense with the same ID already exists');
      this.expense = {} as Expense;
      this.expense.expenseName = 'Accounting Expense';
      this.expense.baseRateReviewMonth = 'month 2 - mar';
      return;
    }
    let IdCounter = this.expenses.length + 1;
    this.expense.Id = IdCounter;
    this.expenses.push(this.expense);
    console.log(this.expense);
    this.expense = {} as Expense;
    this.expense.expenseName = 'Accounting Expense';
    this.expense.baseRateReviewMonth = 'month 2 - mar';

    // Add your logic to save the data or perform any other operations
  }
  saveFixedAsset() {
    const idExists = this.fixedAssets.some(
      (fixedAsset) => fixedAsset.Id === this.fixedAsset.Id
    );
    if (idExists) {
      // console.log('Fixed Asset with the same ID already exists');
      this.fixedAsset = {} as FixedAsset;
      this.fixedAsset.purchasedMonth = 'month 1 - jan';
      // this.expense.expenseName = "Accounting Expense";
      // this.expense.baseRateReviewMonth = "month 2 - mar";
      return;
    }
    let IdCounter = this.fixedAssets.length + 1;
    this.fixedAsset.Id = IdCounter;
    this.fixedAssets.push(this.fixedAsset);
    console.log(this.fixedAsset);
    this.fixedAsset = {} as FixedAsset;
    this.fixedAsset.purchasedMonth = 'month 1 - jan';
  }

  deleteExpense() {
    const index = this.expenses.findIndex(
      (expense) =>
        expense.Id === this.selectedItem?.Id &&
        this.selectedItem.type === 'expense'
    );
    if (index !== -1) {
      this.expenses.splice(index, 1);
    }
    this.modalService.dismissAll();
  }
  editExpense(expense) {
    this.expense = expense;
  }
  editEmployee(employee) {
    this.employee = employee;
  }
  editFixedAsset(fixedAssets) {
    this.fixedAsset = fixedAssets;
  }

  headerLookUp = {
    1: 'setup',
    2: 'revenue calculator',
    3: 'employment',
    4: 'perating expenses',
    5: 'fixed assets',
    6: 'funding calculator',
    7: 'reports',
  };

  model1: NgbDateStruct;
  model2: NgbDateStruct;

  faGear = faGear;
  faCalculator = faCalculator;
  faUsers = faUsers;
  faScroll = faScroll;
  faTruck = faTruck;
  faCoins = faCoins;
  faChartLine = faChartLine;
  faCamera = faCamera;
  faCalendar = faCalendar;
  faPencilAlt = faPencilAlt;
  faXmark = faXmark;
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;

  bizzCalcTabs = BizzCalcTabs;
  primaryActiveTab: BizzCalcTabs = this.bizzCalcTabs.SETUP;
  secondaryActiveTab: BizzCalcTabs = null;
  configuredMonths = [];
  setUpMoth = 2;
  monthIndex = this.setUpMoth;
  monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  monthsArray = [
    {
      month: 'Jan',
      index: 1,
    },
    {
      month: 'Feb',
      index: 2,
    },
    {
      month: 'Mar',
      index: 3,
    },
    {
      month: 'Apr',
      index: 4,
    },
    {
      month: 'May',
      index: 5,
    },
    {
      month: 'Jun',
      index: 6,
    },
    {
      month: 'Jul',
      index: 7,
    },
    {
      month: 'Aug',
      index: 8,
    },
    {
      month: 'Sep',
      index: 9,
    },
    {
      month: 'Oct',
      index: 10,
    },
    {
      month: 'Nov',
      index: 11,
    },
    {
      month: 'Dec',
      index: 12,
    },
  ];
  revenue_Calculator: boolean = false;
  selectedMonth = this.monthsArray.find((x) => x.index == this.monthIndex); //[this.monthIndex];
  selectedDate = this.selectedMonth.month;
  fixedAssetArray = [
    {
      category: 'computer hardware',
      rate: 10,
    },
    {
      category: 'computer software',
      rate: 10,
    },
    {
      category: 'furniture and fittings',
      rate: 10,
    },
    {
      category: 'handling equipment',
      rate: 10,
    },
    {
      category: 'land and buildings',
      rate: 10,
    },
    {
      category: 'office equipment',
      rate: 10,
    },
    {
      category: 'plant and equipment',
      rate: 10,
    },
    {
      category: 'vehicles - commercial',
      rate: 10,
    },
    {
      category: 'vehicles - industrial',
      rate: 10,
    },
    {
      category: 'vehicles - passenger',
      rate: 10,
    },
  ];
  formData: { [index: number]: any } = {
    0: {
      dailySales: '',
      grossProfitMargin: '',
      monthlySalesGrowth: '',
      unknown: '',
    },
  };

  populateFormWithDefaulVAlues() {
    for (let i = 0; i < 12; i++) {
      this.formData[i] = {
        dailySales: '',
        grossProfitMargin: '',
        monthlySalesGrowth: '',
        unknown: '',
      };
    }
  }
  dailySales: string;
  grossProfitMargin: string;
  monthlySalesGrowth: string;

  setPrimaryActiveTab(tab: BizzCalcTabs) {
    this.primaryActiveTab = tab;
    this.secondaryActiveTab = null;
  }

  setSecondaryActiveTab(tab: BizzCalcTabs) {
    this.secondaryActiveTab = tab;
    this.revenue_Calculator = false;
  }

  saveFormData(incr?: any) {
    if (incr != 'incr') {
      this.revenue_Calculator = true;
      this.bizzCalcService.PostRevenue(this.revenueCalculator).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  saveAllFixedAssets(fixedAssets: any) {
    const fixedAssetsModal: IFixedAssetModal = {
      UserId: 82452,
      FixedAssets: [],
    };
    fixedAssets.forEach((fixedAsset) => {
      fixedAssetsModal.FixedAssets.push(fixedAsset);
    });
    this.bizzCalcService.PostFixedAssets(fixedAssetsModal).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  saveAllExpense(expenses: any) {
    const expensesModal: IExpenseModal = {
      UserId: 82452,
      Expenses: [],
    };
    expenses.forEach((item) => {
      let expense: ExpenseModal = {
        expenseitem: 1,
        expenseDate: item.baseRateReviewMonth,
        expChngPerc: item.baseRateReviewValue,
        expMthRt: item.expenseBaseValue,
        PageNumber: 1,
        expenseName: item.expenseName,
      };
      expensesModal.Expenses.push(expense);
    });
    this.bizzCalcService.PostOperatingExpense(expensesModal).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  SaveEmployees(employees: any) {
    const employeeModal: IEmployeeModal = {
      UserId: 82452,
      Employees: [],
    };
    employees.forEach((employee) => {
      let employeeObject: EmployeeModel = {
        EmploymentMonth: employee.employmentMonth,
        NumbeOfEmployees: employee.employmentMonths,
        EmployeeSalary: employee.employeeRate,
        ReviewMonth: employee.employmentGrowthRate,
        ReviewPercentage: employee.employeeGrowthRate,
        PageNumber: 1,
      };
      employeeModal.Employees.push(employeeObject);
    });
    this.bizzCalcService.PostEmployee(employeeModal).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // parentValue: number;
  // parentValue: number = 10;
  // onIncrement(): void {
  //   this.parentValue++;
  // }
  // onDecrement(): void {
  // this.parentValue--;
  // }
  incrementMonth() {
    this.monthIndex++;
    if (this.monthIndex > 0 && this.monthIndex < 13) {
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr');
    } else {
      this.monthIndex = this.monthIndex > 12 ? 12 : 1;
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr');
    }
  }
  decrementMonth() {
    this.monthIndex--;
    if (this.monthIndex < this.setUpMoth) {
      this.monthIndex = this.setUpMoth;
    }
    if (this.monthIndex > 0 && this.monthIndex < 13) {
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr');
    } else {
      this.monthIndex = this.monthIndex < 1 ? 1 : 12;
      this.selectedMonth = this.monthsArray.find(
        (month) => month.index === this.monthIndex
      );
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr');
    }
  }
  setUpdMonths = [
    {
      month: 'Jan',
      monthNo: 1,
    },
    {
      month: 'Feb',
      monthNo: 2,
    },
    {
      month: 'Mar',
      monthNo: 3,
    },
    {
      month: 'Apr',
      monthNo: 4,
    },
    {
      month: 'May',
      monthNo: 5,
    },
    {
      month: 'Jun',
      monthNo: 6,
    },
    {
      month: 'Jul',
      monthNo: 7,
    },
    {
      month: 'Aug',
      monthNo: 8,
    },
    {
      month: 'Sep',
      monthNo: 9,
    },
    {
      month: 'Oct',
      monthNo: 10,
    },
    {
      month: 'Nov',
      monthNo: 11,
    },
    {
      month: 'Dec',
      monthNo: 12,
    },
  ];
  testMonth = [];
  configureMonthsArray(startingMonth) {
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

  constructor(
    private modalService: NgbModal,
    private bizzCalcService: BizzCalcService
  ) {
    console.log();
  }

  ngOnInit(): void {
    this.populateFormWithDefaulVAlues();

    const startingMonth = 4; // User-specified starting month
    this.testMonth = this.configureMonthsArray(startingMonth);
    let adjustmentMonths = this.testMonth.map((month) => {
      return {
        adjustmentMonth: `month ${month.monthNo} - ${month.month}`,
        growthRate: null,
      };
    });
    //month {{ month.monthNo }} - {{ month.month }}
    this.revenueCalculator.AdjustmentMonths = adjustmentMonths; //this.testMonth.map((month) => month.monthNo);
    this.configuredMonths = this.testMonth;
    console.log(this.testMonth);

    //Reports

    this.incomeStatements = [
      {
        incomeStatementItem: 'revenue',
        incomeStatementValue: this.defaultIncomeStatement.revenue,
      },
      {
        incomeStatementItem: 'Cost of sales',
        incomeStatementValue: this.defaultIncomeStatement.costOfSales,
      },
      {
        incomeStatementItem: 'gross profit',
        incomeStatementValue: this.defaultIncomeStatement.groupProfit,
      },
      {
        incomeStatementItem: 'operating expenses',
        incomeStatementValue: this.defaultIncomeStatement.operatingExpenses,
      },
      {
        incomeStatementItem: 'net operating profit',
        incomeStatementValue: this.defaultIncomeStatement.netOperatingProfit,
      },
    ];
    for (let i = 0; i <= 17; i++) {
      const expenseObject = {
        expenseItem: 'expense',
        expenseValue: '1,000,000',
      };

      this.scheduleOfExpenses.push(expenseObject);
    }

    this.balanceSheet = [
      {
        balanceSheetItem: 'fixed assets',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'inventory',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'accounts receivable',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'other asssets',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'current assets',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'total assets',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'account payable',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'non-interest bearing debt',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'net operating assets',
        balanceSheetValue: '2,000,000',
      },
      {
        balanceSheetItem: 'retained earnings',
        balanceSheetValue: '2,000,000',
        financeBy: 'BizzCalc',
      },
      {
        balanceSheetItem: 'owners equity',
        balanceSheetValue: '2,000,000',
        financeBy: 'BizzCalc',
      },
      {
        balanceSheetItem: 'bank account',
        balanceSheetValue: '2,000,000',
        financeBy: 'BizzCalc',
      },
      {
        balanceSheetItem: 'capital employed',
        balanceSheetValue: '2,000,000',
        financeBy: 'BizzCalc',
      },
    ];
  }
}
