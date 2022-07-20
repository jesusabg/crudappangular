import { Component, HostBinding, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {TaskPelis} from '../../interface/task'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  constructor(private taskServie:TaskService, private cookieService: CookieService) { }
  movies:TaskPelis[] = [{
    ID:0,
    Titulo:'',
    Puntuacion:0
  }];
  
  ngOnInit(): void {
    this.getPelis();
  }

  getPelis(){
    this.taskServie.getAllTasks().subscribe(
      {
       next: (response) => {         
         this.movies =response         
       },
       error: (error) => {
        console.log(error);       
       },
      }
     );
  }

  deleteMovie( id:number ){
    this.taskServie.deleteTask(id).subscribe(
      {
       next: (response) => {         
         this.getPelis();
         console.log(response);         
       },
       error: (error) => {
        console.log(error); 
       },
      }
     );
  }

  

}
