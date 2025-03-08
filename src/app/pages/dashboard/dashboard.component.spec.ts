import { ICartItem } from './../../interfaces/cart-item.interface';
import { Component, OnInit } from '@angular/core';
import { IImage } from 'src/app/interfaces/image.interface';
import { DashboardService } from 'src/app/services/dashboard.service';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})

export class DashboardComponent implements OnInit {
  quote;
  whatsNew;
  sellingPrice: string = '';
  whatsNewItems: { cartItem: ICartItem; images: IImage[] }[] = [];
  welcome: { cartItem: ICartItem; images: IImage[] }[] = [];
  username: string = '';
  constructor(
    private quoteService: QuotesService,
    private dashboardServive: DashboardService
  ) {}

  async ngOnInit() {
    this.quote = await this.quoteService.getDashQuote();
    //this.whatsNew = await this.dashboardServive.getWhatsNew();
    this.dashboardServive.getWhatsNewItems().subscribe({
      next: (quotes) => {
        // get images

        quotes.forEach((quote) => {
          console.log('What are quotes ============');
          console.dir(quote);

          //if (quote.productCode === 'BN-002') {
            // get whats new images
            const _whatsNew: { cartItem: ICartItem; images: IImage[] } = {
              cartItem: quote,
              images: [],
            };
            const _welcome: { cartItem: ICartItem; images: IImage[] } = {
              cartItem: quote,
              images: [],
            };
            this.dashboardServive.getMediaItems(quote.id).subscribe({
              next: (image) => {
                console.log('What are images ***************');
                console.dir(image);
                 const _whatsNew: { cartItem: ICartItem; images: IImage[] } = {
              cartItem: quote,
              images: [],
            };
                if(quote.description== 'welcome message'){
                  _welcome.images = image;
                  this.welcome.push(_welcome);
                }
                if(quote.description== "what's new"){
                _whatsNew.images = image;
                this.whatsNewItems.push(_whatsNew);
                }
              },
            });
          //}
        });
      },
    });
    this.username = sessionStorage.getItem('username');
    this.sellingPrice = sessionStorage.getItem('sellingPrice');
  }
}