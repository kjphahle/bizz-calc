import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes.service';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {

  quotes;

  constructor(
    private quotesService: QuotesService,

  ) { }

  swiperBreakpoints = {
    375: { slidesPerView: 1 },
    786: { slidesPerView: 3 }
  };

  async ngOnInit() {
  const quotesResponse = await this.quotesService.getQuotes();
  this.quotes = await Promise.all(quotesResponse);

 // Sort quotes in the component using regular string comparison
 this.quotes = this.quotes.sort((a, b) => {
   const productCodeA = a.productCode || '';  // Fallback to empty string if undefined
   const productCodeB = b.productCode || '';  // Fallback to empty string if undefined

   if (productCodeA < productCodeB) return -1;
   if (productCodeA > productCodeB) return 1;
   return 0;
 });

  }
}
