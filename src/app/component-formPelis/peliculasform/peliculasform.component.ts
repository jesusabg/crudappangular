import { Component, HostBinding, OnInit } from '@angular/core';
import { TaskPelis } from '../../interface/task';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-peliculasform',
  templateUrl: './peliculasform.component.html',
})
export class PeliculasformComponent implements OnInit {

  constructor(private taskService:TaskService , private router: Router, private activedRoute:ActivatedRoute) { }
  @HostBinding('class') classes = 'row';

  movie: TaskPelis = {
    ID: 0,
    Titulo: '',
    Puntuacion: 0
  };

  edit:boolean = false;

  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
        this.taskService.getTask(params['id'])
        .subscribe(
          {
            next: (response) => {
              this.movie = response;
              this.edit = true;
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
    }

  }

  onSubmit() {
    if(this.edit){
      this.updateMovie();
    }else{
      this.saveMovie();
    }
    
  }

  updateMovie(){
    this.taskService.updateTask(this.movie)
    .subscribe(
      {
        next: (response) => {
          console.log(response);
          
          this.router.navigate(['/login/user']);
        },
        error: (error) => {
          console.log(error);
        },
      }
    );
  }

  saveMovie() {
    this.taskService.createTaskFormPelis(this.movie).subscribe(
      {
        next: (response) => {
          this.router.navigate(['/login/user']);
          console.log(response)
        },
        error: (error) => {
          console.log(error);
        },
      }
    );
  }

}
