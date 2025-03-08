import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BizzclassService {
  currentCourse;
  private bizzCourses;

  async donwloadContent(id: string) {
    const sessionToken = this.authService.getSessionToken();
    let headers = new HttpHeaders({
      apiKey: environment.apiKey,
      token: sessionToken,
    });
    let response: any = await this.http
      .get(
        environment.apiUrl +
          '/api/BizzBean/v1/media/' +
          id +
          '?refNo=0&type=Training%20material',
        {
          headers,
        }
      )
      .toPromise();
    if (response.length > 0) {
      return environment.apiUrl + '/api/BizzBean/v1/image/' + response[0].id;
    } else {
      return '';
    }
  }

  async getBizzCourses(): Promise<any> {
    const sessionToken = this.authService.getSessionToken();
    let headers = new HttpHeaders({
      apiKey: environment.apiKey,
      token: sessionToken,
    });

    if (this.bizzCourses == undefined) {
      this.bizzCourses = await this.http
        .get(environment.apiUrl + '/api/BizzBean/v1/purchased', {
          headers,
        })
        .toPromise();
    }
    return this.bizzCourses;
  }

  async getCurrentCourse(id?: string): Promise<any> {
    let headers = new HttpHeaders({
      apiKey: environment.apiKey,
    });
  
    const courseId = id === undefined || id === '' ? this.currentCourse.id : id;
  
    let response: any = await this.http
      .get(environment.apiUrl + '/api/BizzBean/v1/media/' + courseId, {
        headers,
      })
      .toPromise();
  
    let videoList = [];
    let imageList = [];
    let mediaB1 = '';
  
    // Include all items starting with C, D, E for images and videos
    response.forEach((item) => {
      // Check if the item is an image and has a reference number starting with C or D, etc.
      if (item.typeDescription === 'Product Master Image' && item.referenceNo.match(/^[C-Z]\d/)) {
        imageList.push(item);
      } else if (item.typeDescription === 'Video' && item.referenceNo.match(/^[C-Z]\d/)) {
        videoList.push(item);
      }

      if (item.referenceNo === 'B1' && item.typeDescription === 'Product Master Image') {
        mediaB1 = environment.apiUrl + '/api/BizzBean/v1/image/' + item.id; // Construct the URL for the B1 image
      }


    });
  
    // Sort lists if needed (optional, based on your requirements)
    videoList.sort((a, b) => a.referenceNo.localeCompare(b.referenceNo));
    imageList.sort((a, b) => a.referenceNo.localeCompare(b.referenceNo));
  
    // Return the filtered lists
    return { videoList, imageList, mediaB1 };
  }
  
  resetAll() {
    this.bizzCourses = undefined;
    this.currentCourse = undefined;
  }

  constructor(private http: HttpClient, private authService: AuthService) {}
}
