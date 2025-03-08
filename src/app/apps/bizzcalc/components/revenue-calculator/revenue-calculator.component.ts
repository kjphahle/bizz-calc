import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { BizzCalcTabs } from 'src/app/enums/apps/bizzcalc/bizzcalcTabs.enum';

@Component({
    selector: 'app-revenue-calculator',
    templateUrl: './revenue-calculator.component.html',
    styleUrls: ['./revenue-calculator.component.scss'],
    standalone: false
})
export class RevenueCalculatorComponent {
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  revenue_Calculator : boolean = false;
  setUpMoth = 2;
  monthIndex = this.setUpMoth;
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
  testMonth = [];
  configuredMonths = [];
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

  secondaryActiveTab: BizzCalcTabs = null;
  selectedMonth = this.monthsArray.find(x => x.index == this.monthIndex ); //[this.monthIndex];
  selectedDate = this.selectedMonth.month;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.populateFormWithDefaulVAlues();
 
    const startingMonth = 1; // User-specified starting month
    this.testMonth = this.configureMonthsArray(startingMonth);
    this.configuredMonths = this.testMonth;
    console.log(this.testMonth);
  }

  configureMonthsArray(startingMonth) {
    let combinedList = [];
    const adjustedMonthsArray = [...this.setUpdMonths];
    const startIndex = adjustedMonthsArray.findIndex(month => month.monthNo === startingMonth);
    
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
          monthNo: month.monthNo + firstList.length
        });
      }
      console.log(combinedList);
    }
    return combinedList;
  }


  incrementMonth() {
    this.monthIndex++;
    if(this.monthIndex > 0 && this.monthIndex < 13){
    this.selectedMonth = this.monthsArray.find((month) => month.index === this.monthIndex);
    this.selectedDate = this.selectedMonth.month;
    this.saveFormData('incr');
  }
    else{
      this.monthIndex = this.monthIndex > 12 ? 12 : 1;
      this.selectedMonth = this.monthsArray.find((month) => month.index === this.monthIndex);
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr');
    }
  }
  setSecondaryActiveTab(tab: BizzCalcTabs) {
    this.secondaryActiveTab = tab;
    this.revenue_Calculator = false;
  }
  
  saveFormData(incr?: any){ 
    if(incr != 'incr'){
      this.revenue_Calculator = true;
      //this.configuredMonths  = this.monthsArray.slice(this.setUpMoth - 1);
    }
  }
  decrementMonth() {
    this.monthIndex--;
    if(this.monthIndex < this.setUpMoth)
    {
      this.monthIndex = this.setUpMoth;
    }
    if(this.monthIndex > 0 && this.monthIndex < 13){
      this.selectedMonth = this.monthsArray.find((month) => month.index === this.monthIndex);
      this.selectedDate = this.selectedMonth.month;
      this.saveFormData('incr'); 
    }
      else{
        this.monthIndex = this.monthIndex < 1 ? 1 : 12;
        this.selectedMonth = this.monthsArray.find((month) => month.index === this.monthIndex);
        this.selectedDate = this.selectedMonth.month;
        this.saveFormData('incr');
      }
  }
}
