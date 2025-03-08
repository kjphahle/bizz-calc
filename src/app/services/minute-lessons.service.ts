import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MinuteLessonsService {
  getPodcast() {
    throw new Error('Method not implemented.');
  }
  allVideo: any[] = [];

  //headers that pass the API Key
  headers = new HttpHeaders({
    apiKey: environment.apiKey,
  });

  async getBizzVideos(): Promise<any[]> {
    if (this.allVideo.length == 0) {
      try {
      const videos: any[] = await this.http
        .get<any[]>(environment.apiUrl + '/api/BizzBean/v1/catitems/2863', {
          headers: this.headers,
        })
        .toPromise();

      this.allVideo = await Promise.all(videos.map(video => this.mapVideo(video)));
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }
      return this.allVideo;
    } 
  
    async mapVideo(video): Promise<any> {
      //getMedia and them map media item id in to be able to get image
      const mediaIds = await this.getMediaItems(video.id);
      return {
        id: video.id,
        heading: video.description,
        productCode: video.productCode,
        author: video.userName,
        category: video.subCategory != 'Not defined' ? video.subCategory : '',
        media1: mediaIds.media1,
        media2: mediaIds.media2,
        fullDescription: video.fullDescription,
        productUrl: video.productUrl,
        sellingPrice: video.sellingPrice,
        purchased: video.purchased,
        isFeatured: video.isFeatured,
      };
    }



  async getMediaItems(videoId): Promise<any> {
    const mediaItems: any = await this.http
      .get(
        environment.apiUrl +
        `/api/BizzBean/v1/media/${videoId}?refNo=1&type=Product%20Master%20Image`,
        {
          headers: this.headers,
        }
      )
      .toPromise();
    const videoItems: any = await this.http
      .get(
        environment.apiUrl +
        `/api/BizzBean/v1/media/${videoId}?refNo=2&type=Video`,
        {
          headers: this.headers,
        }
      )
      .toPromise();

    let media1 = mediaItems.length > 0 ? mediaItems[0].id : '';
    let media2 = videoItems.length > 0 ? videoItems[0].id : '';
    return { media1, media2, };
  }
  constructor(private http: HttpClient) {}
}
