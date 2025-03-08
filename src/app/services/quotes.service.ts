import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  allQuotes: any[] = [];

  headers = new HttpHeaders({
    apiKey: environment.apiKey,
  });

      async getQuotes(): Promise<any[]> {
        if (this.allQuotes.length == 0) {
          let quotes: any = await this.http
            .get(environment.apiUrl + '/api/BizzBean/v1/catitems/2311', {
              headers: this.headers,
            })
            .toPromise();

            this.allQuotes = quotes.map((quote) => {
              return this.mapQuotes(quote);
            });
      
            return this.allQuotes;
          } else {
            return this.allQuotes;
          }
      }

      async mapQuotes(quote): Promise<any> {
        //getMedia and them map media item id in to be able to get image
        const mediaId: string = await this.getMediaItems(quote.id);
        return {
          id: quote.id,
          heading: quote.description,
          productCode: quote.productCode,
          author: quote.userName,
          category: quote.subCategory != 'Not defined' ? quote.subCategory : '',
          mediaId: mediaId,
        };
      }

    //funtion to get media items
    async getMediaItems(aquoteId) {
      const mediaItem = await this.http
        .get(environment.apiUrl + `/api/BizzBean/v1/media/${aquoteId}`, {
          headers: this.headers,
        })
        .toPromise();
      let media = mediaItem[0];
      return media != undefined && media.id != undefined ? media.id : '';
    }

  constructor(private http: HttpClient) {}
}
