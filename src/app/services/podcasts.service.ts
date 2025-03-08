import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PodcastsService {
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
      let videos: any = await this.http
        .get(environment.apiUrl + '/api/BizzBean/v1/catitems/2412', {
          headers: this.headers,
        })
        .toPromise();
      this.allVideo = videos.map((video) => {
        return this.mapVideo(video);
      });
      return this.allVideo;
    } else {
      return this.allVideo;
    }
  }

  async mapVideo(video): Promise<any> {
    const mediaId: string = await this.getMediaItems(video.id);
    return {
      id: video.id,
      heading: video.fullDescription,
      productCode: video.productCode,
      author: video.userName,
      category: video.subCategory != 'Not defined' ? video.subCategory : '',
      mediaId: mediaId,
      productUrl: video.productUrl,
    };
  }

  async getMediaItems(videoId) {
    const mediaItem = await this.http
      .get(environment.apiUrl + `/api/BizzBean/v1/media/${videoId}`, {
        headers: this.headers,
      })
      .toPromise();
    let media = mediaItem[0];
    return media != undefined && media.id != undefined ? media.id : '';
  }
  constructor(private http: HttpClient) {}
}
