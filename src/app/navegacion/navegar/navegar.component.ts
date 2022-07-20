import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegar',
  templateUrl: './navegar.component.html',
})
export class NavegarComponent implements OnInit {

  constructor(private cookieService:CookieService, private router:Router) { }

  ngOnInit(): void {
  }
  removeCookie(){
    this.cookieService.delete('userAuth');
    localStorage.clear();
    alert('Sesión finalizada te redirigiremos al login');
    this.router.navigate(['/login'])
  }
}
