import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  setProduct(product) {
    localStorage.setItem('product', JSON.stringify(product));
  }

  getProduct() {
    return JSON.parse(localStorage.getItem('product'));
  }

  updatePayment() {
    let headers = new HttpHeaders({
      apiKey: environment.apiKey,
      token: sessionStorage.getItem('sessionToken'),
    });

    let productData = JSON.parse(localStorage.getItem('product'));
    let payload = {
      itemId: productData.id,
      qty: 1,
      amount: productData.sellingPrice,
    };
    let response = this.http
      .post(environment.apiUrl + '/api/BizzBean/v1/tx', payload, { headers })
      .toPromise()
      .then((res) => {
        localStorage.removeItem('product');
      })
      .catch((err) => {
        console.error(err);
      });

    return response;
  }

  constructor(private http: HttpClient) {}
}
