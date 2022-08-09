import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { retryWhen, concatMap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';


export const retryCount = 3;
export const retryWaitMilliSeconds = 4000;
export let flagSpinner2: boolean = true;
export let respuestaErrorCero: boolean;
export const fibonacci: number[] = [5, 20];
export let soloUnValorFibonacci: number;
@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router) {

  }
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    function listFibonacci(num:number) {
      for (let i: number = 2; i < num; i++) {
        soloUnValorFibonacci = (i*1000) 
        fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1];
      }
      return soloUnValorFibonacci;
    }
    listFibonacci(retryCount);

    const acces_token: string = this.cookieService.get('userAuth')
    let req = request;
    if (acces_token) {
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${acces_token}`
        }
      });
    }
    return next.handle(req).pipe(
      retryWhen(error =>
        error.pipe(
          concatMap((_error, count) => {
            if (_error.status === 400) {
              this.router.navigateByUrl('/login');
              console.log('error 400 contraseña incorrecta');
            }
            else if (count <= retryCount && _error.status == 0) {
              console.log('Error status 0');
              return of(_error)
            }
            respuestaErrorCero = true;
            flagSpinner2 = false;
            return throwError(_error);
          }),
          delay(retryWaitMilliSeconds+soloUnValorFibonacci)
        )
      )
    );

  }
}

