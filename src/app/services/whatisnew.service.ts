import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WhatisnewService {

  allApps = [];

  headers = new HttpHeaders({
    apiKey: environment.apiKey,
  });

  async getBizzApps(): Promise<any[]> {
    if (this.allApps.length == 0) {
      let apps: any = await this.http
        .get(environment.apiUrl + '/api/BizzBean/v1/catitems/521', {
          headers: this.headers,
        })
        .toPromise();

        this.allApps = apps.map((app) => {
          return this.mapApps(app);
        });
  
        return this.allApps;
      } else {
        return this.allApps;
      }
  }
  async mapApps(app): Promise<any> {
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
      media3: mediaIds.media3,
      fullDescription: app.fullDescription,
      productUrl: app.productUrl,
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
  const mediaItems3: any = await this.http
  .get(
    environment.apiUrl +
      `/api/BizzBean/v1/media/${appId}?refNo=2&type=Product%20Master%20Image`,
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
let media3 = mediaItems3.length > 0 ? mediaItems3[0].id : '';
let media2 = videoItems.length > 0 ? videoItems[0].id : '';
return { media1, media2, media3 };
}

//function to get comment when you open the promo card
async getComments(appId) {
return this.http
  .get(environment.apiUrl + `/api/BizzBean/v1/comments/${appId}`, {
    headers: this.headers,
  })
  .toPromise();
}
constructor(private http: HttpClient) {}
}
