import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { WhatisnewService } from 'src/app/services/whatisnew.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})

export class DashboardComponent implements OnInit {

  username: string = '';
  allDashboards;
  allWhatsnews;
  //quotes;

  quotes = [];
  currentImage: string;
  currentWhatsNewImage: string;

  bizzApps;

  constructor(
    private dashboardService: DashboardService,
    private quotesService: QuotesService,
    private whatisnewservice: WhatisnewService,
  ) { }

  async ngOnInit() {

    const appsResponse = await this.whatisnewservice.getBizzApps();
    this.bizzApps = await Promise.all(appsResponse);
  
      // Sort apps in the component
   //this.bizzApps = appsResponse.sort((a, b) => a.productCode.localeCompare(b.productCode));
  
  
   // Sort apps in the component using regular string comparison
   this.bizzApps = this.bizzApps.sort((a, b) => {
     const productCodeA = a.productCode || '';  // Fallback to empty string if undefined
     const productCodeB = b.productCode || '';  // Fallback to empty string if undefined
  
     if (productCodeA < productCodeB) return -1;
     if (productCodeA > productCodeB) return 1;
     return 0;
   });

    //user name
    this.username = sessionStorage.getItem('username');
    
    //welcome 
    const dashboards = await this.dashboardService.getDashboards();
    this.allDashboards = await Promise.all(dashboards);


    //what is new 
    const whatsnewsResponse = await this.dashboardService.getWhatsNews();
    this.allWhatsnews = await Promise.all(whatsnewsResponse);

    //Quotes
    const quotesResponse = await this.quotesService.getQuotes();
    this.quotes = await Promise.all(quotesResponse);

    // Set the current image based on the current date
    this.setDailyImage();
    this.setDailyWhatsNewImage();
  }

  //daily for thoughts

  setDailyImage() {
    if (this.quotes.length > 0) {
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 0);
      const diff = today.getTime() - startOfYear.getTime(); // Get the difference in milliseconds
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)); // Calculate the day of the year
      const index = dayOfYear % this.quotes.length; // Cycle through the quotes
      this.currentImage = `https://api.asone.global/api/BizzBean/v1/image/${this.quotes[index].mediaId}`;
    }
  }

//daily for what is new
setDailyWhatsNewImage() {
  if (this.allWhatsnews.length > 0) {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % this.allWhatsnews.length;
    this.currentWhatsNewImage = `https://api.asone.global/api/BizzBean/v1/image/${this.allWhatsnews[index].mediaId}`;
  }
}


}

