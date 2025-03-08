import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class BizzappsService {
  allApps: any[] = [];

  private headers = new HttpHeaders({
    apiKey: environment.apiKey,
  });

  constructor(private http: HttpClient) { }

  async getBizzApps(): Promise<any[]> {
    if (this.allApps.length === 0) {
      try {
        const apps: any[] = await this.http
          .get<any[]>(`${environment.apiUrl}/api/BizzBean/v1/catitems/1531`, {
            headers: this.headers,
          })
          .toPromise();

        this.allApps = await Promise.all(apps.map(app => this.mapApp(app)));
      } catch (error) {
        console.error('Error fetching apps:', error);
      }
    }

    return this.allApps;
  }

  async mapApp(app): Promise<any> {
    //getMedia and them map media item id in to be able to get image
    const mediaIds = await this.getMediaItems(app.id);
    return {
      id: app.id,
      heading: app.description,
      productCode: app.productCode,
      author: app.userName,
      category: app.subCategory != 'Not defined' ? app.subCategory : '',
      media1: mediaIds.media1,
      media2: mediaIds.media2,
      fullDescription: app.fullDescription,
      productUrl: app.productUrl,
      sellingPrice: app.sellingPrice,
      purchased: app.purchased,
      isFeatured: app.isFeatured,
    };
  }

  //funtion to get media items
  async getMediaItems(appId) {
    const mediaItems: any = await this.http
      .get(
        environment.apiUrl +
        `/api/BizzBean/v1/media/${appId}?refNo=1&type=Product%20Master%20Image`,
        {
          headers: this.headers,
        }
      )
      .toPromise();
    const videoItems: any = await this.http
      .get(
        environment.apiUrl +
        `/api/BizzBean/v1/media/${appId}?refNo=3&type=Video`,
        {
          headers: this.headers,
        }
      )
      .toPromise();

    let media1 = mediaItems.length > 0 ? mediaItems[0].id : '';
    let media2 = videoItems.length > 0 ? videoItems[0].id : '';
    return { media1, media2, };
  }

}