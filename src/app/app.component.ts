import { Component, HostBinding } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './interface/task';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
  title = 'loginApi';
  constructor (private TaskService: TaskService,private cookieService: CookieService) {}
}
