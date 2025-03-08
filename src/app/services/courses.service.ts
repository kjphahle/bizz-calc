import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
 // currentCourse;
 // private bizzCourses;
  allCourses = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  //headers that pass the API Key
  headers = new HttpHeaders({
    apiKey: environment.apiKey,
  });


  //CODE FOR COURSE PLAYER

 /* async donwloadContent(id: string) {
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

    const courseId = id == undefined || id == '' ? this.currentCourse.id : id;

    let response: any = await this.http
      .get(environment.apiUrl + '/api/BizzBean/v1/media/' + courseId, {
        headers,
      })
      .toPromise();
    let videoList = [];
    let imageList = [];
    response.forEach((item) => {
      if (item.typeDescription == 'Product Master Image') {
        imageList.push(item);
      } else if (item.typeDescription == 'Video') {
        videoList.push(item);
      }
    });
    return { videoList, imageList };
  }

  resetAll() {
    this.bizzCourses = undefined;
    this.currentCourse = undefined;
  }*/

  //CODE FOR COURSE.COMPONENT & HTML

//funtion to get front card image and video
  async getCourses(): Promise<any[]> {
    if (this.allCourses.length == 0) {
      let courses: any = await this.http
        .get(environment.apiUrl + '/api/BizzBean/v1/catitems/422', {
          headers: this.headers,
        })
        .toPromise();
      this.allCourses = courses.map((course) => {
        return this.mapCourse(course);
      });
      return this.allCourses;
    } else {
      return this.allCourses;
    }
  }

  
  async mapCourse(course): Promise<any> {
    //getCourse and them mapCourse item id in to be able to get image
    const mediaIds = await this.getMediaItems(course.id);
    return {
      id: course.id,
      heading: course.description,
      productCode: course.productCode,
      author: course.userName,
      category: course.subCategory != 'Not defined' ? course.subCategory : '',
      media1: mediaIds.media1,
      media2: mediaIds.media2,
      fullDescription: course.fullDescription,
      productUrl: course.productUrl,
      sellingPrice: course.sellingPrice,
      purchased: course.purchased,
      isFeatured: course.isFeatured,
    };
  }

  //funtion to get front card image and video
  async getMediaItems(courseId) {
    const mediaItems: any = await this.http
      .get(
        environment.apiUrl +
          `/api/BizzBean/v1/media/${courseId}?refNo=A1&type=Product%20Master%20Image`,
        {
          headers: this.headers,
        }
      )
      .toPromise();
    const videoItems: any = await this.http
      .get(
        environment.apiUrl +
          `/api/BizzBean/v1/media/${courseId}?refNo=A2&type=Video`,
        {
          headers: this.headers,
        }
      )
      .toPromise();

    let media1 = mediaItems.length > 0 ? mediaItems[0].id : '';
    let media2 = videoItems.length > 0 ? videoItems[0].id : '';
    return { media1, media2,};
  }

  }









