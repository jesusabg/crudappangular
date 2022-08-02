import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegar',
  templateUrl: './navegar.component.html',
})
export class NavegarComponent {

  constructor(private cookieService:CookieService, private router:Router) { }

  removeCookie(){
    this.cookieService.delete('userAuth');
    localStorage.clear();
    alert('Sesión finalizada te redirigiremos al login');
    this.router.navigate(['/login'])
  }
}
