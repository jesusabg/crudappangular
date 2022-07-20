import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})

export class UserGuardGuard implements CanActivate {
  constructor (private cookieSerive:CookieService, private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieSerive.check('userAuth')
    if (!cookie) {
      alert('Sesión expirada te redirigiremos al login');
      this.router.navigate(['/','login']);
    }
    return true
  }


  
}
