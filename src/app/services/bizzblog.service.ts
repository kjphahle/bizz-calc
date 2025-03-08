import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BizzblogService {

allBlogs: any[] = [];

  headers = new HttpHeaders({
    apiKey: environment.apiKey,
  });

  //Function to get all blogs and the map them
  async getBizzBlogs(): Promise<any[]> {
    if (this.allBlogs.length == 0) {
      let blogs: any = await this.http
        .get(environment.apiUrl + '/api/BizzBean/v1/catitems/1713', {
          headers: this.headers,
        })
        .toPromise();

      this.allBlogs = blogs.map((blog) => {
        return this.mapBlog(blog);
      });

      return this.allBlogs;
    } else {
      return this.allBlogs;
    }
  }

  //bizzblog mapping function
  async mapBlog(blog): Promise<any> {
    //getMedia and them map media item id in to be able to get image
    const mediaId: string = await this.getMediaItems(blog.id);
    return {
      id: blog.id,
      heading: blog.description,
      productCode: blog.productCode,
      author: blog.userName,
      category: blog.subCategory != 'Not defined' ? blog.subCategory : '',
      mediaId: mediaId,
    };
  }

  //funtion to get media items
  async getMediaItems(blogId) {
    const mediaItem = await this.http
      .get(environment.apiUrl + `/api/BizzBean/v1/media/${blogId}`, {
        headers: this.headers,
      })
      .toPromise();
    let media = mediaItem[0];
    return media != undefined && media.id != undefined ? media.id : '12391';
  }

  //function to get comment when you open the blog
  async getComments(blogId) {
    return this.http
      .get(environment.apiUrl + `/api/BizzBean/v1/comments/${blogId}`, {
        headers: this.headers,
      })
      .toPromise();
  }

  constructor(private http: HttpClient) {}
}
