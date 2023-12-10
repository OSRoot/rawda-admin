import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isRefreshingToken = false;
  constructor(
    private authService:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.addToken(request, next).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401: // need to refresh Token
              if (request.url.indexOf('login') > 0 || request.url.indexOf('register') > 0) return throwError(err);
              return this.handle401Error(request, next);
            case 403: // refresh Token Failed
              return this.handle403Error();
            default:
              // any other Error
              return throwError(err);
          }
        } else {
          return throwError(err);
        }
      })
    );
  }


  addToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let request = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.accessToken,
      },
    });
    return next.handle(request);
  }


  handle403Error() {
    this.authService.logOut();
    return EMPTY;
  }

  handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getRefreshToken().pipe(
      switchMap((token) => {
        return this.addToken(req, next);
      })
    );
  }
}
