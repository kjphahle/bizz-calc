import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class authInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        apiKey: 'G37BF2948D54BB2A5CEF4D1BD3F3CA3123',
        token: sessionStorage['sessionToken'] ?? "",
      }
    });

    return next.handle(request);
  }
}
