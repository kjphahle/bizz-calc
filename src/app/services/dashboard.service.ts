import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  allDashboards = [];
  allWhatsnews: any[] = [];
  
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    apiKey: environment.apiKey,
  });

  async getDashboards(): Promise<any[]> {
    if (this.allDashboards.length == 0) {
      let dashboards: any = await this.http
        .get(environment.apiUrl + '/api/BizzBean/v1/catitems/1509', {
          headers: this.headers,
        })
        .toPromise();
      this.allDashboards = dashboards.map((dashboard) => {
        return this.mapDashboard(dashboard);
      });
      return this.allDashboards;
    } else {
      return this.allDashboards;
    }
  }

  async mapDashboard(dashboard): Promise<any> {
    const mediaIds = await this.getMediaItems(dashboard.id);
    return {
      id: dashboard.id,
      heading: dashboard.description,
      productCode: dashboard.productCode,
      category: dashboard.subCategory !== 'Not defined' ? dashboard.subCategory : '',
      media1: mediaIds.media1,
      media2: mediaIds.media2,
      media3: mediaIds.media3,
      referenceNo: dashboard.referenveNo,
      comments: dashboard.comments, // Ensure 'comment' is mapped here
    };
  }

    //funtion to get media items
  async getMediaItems(dashboardId) {
    const mediaItems: any = await this.http
      .get(
        environment.apiUrl +
          `/api/BizzBean/v1/media/${dashboardId}?refNo=1&type=Product%20Master%20Image`,
        {
          headers: this.headers,
        }
      )
      .toPromise();
      const mediaItems3: any = await this.http
      .get(
        environment.apiUrl +
          `/api/BizzBean/v1/media/${dashboardId}?refNo=2&type=Product%20Master%20Image`,
        {
          headers: this.headers,
        }
      )
      .toPromise();
    const videoItems: any = await this.http
      .get(
        environment.apiUrl +
          `/api/BizzBean/v1/media/${dashboardId}?refNo=3&type=Video`,
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


//whats new category
async getWhatsNews(): Promise<any[]> {
  if (this.allWhatsnews.length == 0) {
    let whatsnews: any = await this.http
      .get(environment.apiUrl + '/api/BizzBean/v1/catitems/521', {
        headers: this.headers,
      })
      .toPromise();

      this.allWhatsnews = whatsnews.map((whatsnew) => {
        return this.mapWhatsnews(whatsnew);
      });

      return this.allWhatsnews;
    } else {
      return this.allWhatsnews;
    }
}

async mapWhatsnews(whatsnew): Promise<any> {
  //getMedia and them map media item id in to be able to get image
  const mediaId: string = await this.getMediaItem(whatsnew.id);
  return {
    id: whatsnew.id,
    heading: whatsnew.description,
    productCode: whatsnew.productCode,
    author: whatsnew.userName,
    category: whatsnew.subCategory != 'Not defined' ? whatsnew.subCategory : '',
    mediaId: mediaId,
  };
}

//funtion to get media items
async getMediaItem(whatsnewId) {
const mediaItem = await this.http
  .get(environment.apiUrl + `/api/BizzBean/v1/media/${whatsnewId}`, {
    headers: this.headers,
  })
  .toPromise();
let media = mediaItem[0];
return media != undefined && media.id != undefined ? media.id : '';
}



}