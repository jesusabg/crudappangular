import { Component, HostBinding, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interface/task';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private TaskService: TaskService,private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }
  
  @HostBinding('class') classes = 'row'
  user:Task ={
    usuario: '',
    password: ''
  };
  datosIncorrectos:boolean = false
  onSubmit() {
    this.user.password = btoa(this.user.password);
    this.TaskService.createTask(this.user).subscribe(
      {
        next: (response) => {
          var objetoAJson = JSON.stringify(response)
          var JsonAObjeto = JSON.parse(objetoAJson);
          this.cookieService.set('userAuth', JsonAObjeto.access_token, 0.0104167 )
          this.router.navigate(['login/user'])          
        },
        error: (error) => {
          console.log(error);
          this.datosIncorrectos = true;
        },
      }
    );
  }

}
