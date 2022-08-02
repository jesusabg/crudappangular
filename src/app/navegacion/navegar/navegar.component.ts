import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navegar',
  templateUrl: './navegar.component.html',
})
export class NavegarComponent {

  constructor(private cookieService:CookieService, private router:Router) { }

  removeCookie(){
    this.cookieService.delete('userAuth');
    localStorage.clear();
    Swal.fire('Sesión finalizada');
    this.router.navigate(['/login'])
  }
}
