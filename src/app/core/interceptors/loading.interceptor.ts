import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request method is POST, PUT, or DELETE
    const isMethodToIntercept = ['POST', 'PUT', 'DELETE'].includes(req.method.toUpperCase());

    // If it's not the desired method, just pass the request through without intercepting
    if (!isMethodToIntercept) {
      return next.handle(req);
    }

    // Intercept the request and handle loading state
    return next.handle(req).pipe(
      tap(event => {
        this.loader.loading.next(true);
        if (event.type === HttpEventType.Response) {
          if (event.status === 200) {
            this.loader.loading.next(false);
          }
        }
      })
    );
  }
}